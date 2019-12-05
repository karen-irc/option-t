NODE_BIN := node
NPM_MOD_DIR := $(CURDIR)/node_modules
NPM_BIN := $(NPM_MOD_DIR)/.bin
NPM_CMD := npm

SRC_DIR := $(CURDIR)/src
DOCS_DIR := $(CURDIR)/docs
SRC_TEST_DIR := $(CURDIR)/__tests__

DIST_DIR := $(CURDIR)/__dist
DIST_DOCS_DIR := $(DIST_DIR)/docs
DIST_ESM_DIR := $(DIST_DIR)/esm
DIST_COMMONJS_DIR := $(DIST_DIR)/cjs
TEST_CACHE_DIR := $(CURDIR)/__test_cache
TMP_MJS_DIR := $(CURDIR)/__tmp_mjs

## In CI environment, we should change some configuration
ifeq ($(CI),true)
else
endif


all: help

help:
	@echo "Specify the task"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@exit 1


###########################
# Clean
###########################
CLEAN_TARGETS := \
	dist \
	test_cache \
	tmp_mjs \

.PHONY: clean
clean: $(addprefix clean_, $(CLEAN_TARGETS))

.PHONY: clean_dist
clean_dist:
	$(NPM_BIN)/del $(DIST_DIR)

.PHONY: clean_test_cache
clean_test_cache:
	$(NPM_BIN)/del $(TEST_CACHE_DIR)

.PHONY: clean_tmp_mjs
clean_tmp_mjs:
	$(NPM_BIN)/del $(TMP_MJS_DIR)


###########################
# Build
###########################
.PHONY: distribution
distribution: build cp_docs cp_changelog cp_license cp_readme cp_manifest

.PHONY: build
build: build_cjs build_esm ## Build all targets.

.PHONY: build_cjs
build_cjs: build_cjs_js build_cjs_type_definition build_cjs_ts ## Build `cjs/`.

.PHONY: build_cjs_js
build_cjs_js: clean_dist
	$(NPM_BIN)/babel $(SRC_DIR) \
    --out-dir $(DIST_COMMONJS_DIR) \
    --extensions .js \
    --no-babelrc \
    --config-file $(CURDIR)/tools/babel/babelrc.cjs.js

.PHONY: build_cjs_type_definition
build_cjs_type_definition: clean_dist
	$(NPM_BIN)/cpx '$(SRC_DIR)/**/*.d.ts' $(DIST_COMMONJS_DIR) --preserve

.PHONY: build_cjs_ts
build_cjs_ts: clean_dist
	$(NPM_BIN)/tsc --project $(CURDIR)/tsconfig_cjs.json --outDir $(DIST_COMMONJS_DIR)

.PHONY: build_esm
build_esm: build_mjs_cp_mjs_to_esm build_mjs_cp_dts_to_esm ## Build `esm/`.

.PHONY: build_mjs_cp_mjs_to_esm
build_mjs_cp_mjs_to_esm: build_mjs_rename_js_to_mjs clean_dist
	$(NPM_BIN)/babel $(TMP_MJS_DIR) --out-dir $(DIST_ESM_DIR) --extensions=.mjs --no-babelrc --config-file $(CURDIR)/tools/babel/babelrc.mjs.pathrewiter.js --keep-file-extension

.PHONY: build_mjs_cp_dts_to_esm
build_mjs_cp_dts_to_esm: build_mjs_create_tmp_mjs clean_dist
	$(NPM_BIN)/cpx '$(TMP_MJS_DIR)/**/*.d.ts' $(DIST_ESM_DIR) --preserve

.PHONY: build_mjs_rename_js_to_mjs
build_mjs_rename_js_to_mjs: build_mjs_create_tmp_mjs
	$(NPM_BIN)/rename '$(TMP_MJS_DIR)/**/*.js' '{{f}}.mjs'

.PHONY: build_mjs_create_tmp_mjs
build_mjs_create_tmp_mjs: build_mjs_create_tmp_mjs_call_tsc build_mjs_create_tmp_mjs_call_babel build_mjs_create_tmp_mjs_cal_cpx

.PHONY: build_mjs_create_tmp_mjs_call_tsc
build_mjs_create_tmp_mjs_call_tsc: clean_tmp_mjs
	$(NPM_BIN)/tsc --project $(CURDIR)/tsconfig_esm.json --outDir $(TMP_MJS_DIR)

.PHONY: build_mjs_create_tmp_mjs_call_babel
build_mjs_create_tmp_mjs_call_babel: clean_tmp_mjs
	$(NPM_BIN)/babel $(SRC_DIR) --out-dir $(TMP_MJS_DIR) --extensions=.js --no-babelrc --config-file $(CURDIR)/tools/babel/babelrc.esm.js

.PHONY: build_mjs_create_tmp_mjs_cal_cpx
build_mjs_create_tmp_mjs_cal_cpx: clean_tmp_mjs
	$(NPM_BIN)/cpx '$(SRC_DIR)/**/*.d.ts' $(TMP_MJS_DIR) --preserve

.PHONY: cp_docs
cp_docs: clean_dist
	$(NPM_BIN)/cpx '$(DOCS_DIR)/**/*' $(DIST_DOCS_DIR)

.PHONY: cp_changelog
cp_changelog: clean_dist
	$(NPM_BIN)/cpx '$(CURDIR)/CHANGELOG.md' $(DIST_DIR)

.PHONY: cp_license
cp_license: clean_dist
	$(NPM_BIN)/cpx '$(CURDIR)/LICENSE.MIT' $(DIST_DIR)

.PHONY: cp_readme
cp_readme: clean_dist
	$(NPM_BIN)/cpx '$(CURDIR)/README.md' $(DIST_DIR)

.PHONY: cp_manifest
cp_manifest: clean_dist
	$(NPM_BIN)/cpx '$(CURDIR)/package.json' $(DIST_DIR)


###########################
# Lint
###########################
.PHONY: lint
lint: eslint ## Run all lints

.PHONY: eslint
eslint:
	$(NPM_BIN)/eslint $(CURDIR) '$(CURDIR)/**/.eslintrc.js' --ext=.js,.jsx,.mjs,.ts,.tsx


###########################
# Test
###########################
.PHONY: test
test: lint build run_ava test_distribution_contain_all test_esmodule_path_rewrite ## Run all tests

.PHONY: build_test
build_test: build clean_test_cache
	$(NPM_BIN)/tsc --project $(CURDIR)/tsconfig_test.json --outDir $(TEST_CACHE_DIR)

.PHONY: run_ava
run_ava: build build_test
	$(MAKE) run_ava_only -C $(CURDIR)

.PHONY: run_ava_only
run_ava_only: ## Run ava only.
	$(NPM_BIN)/ava

.PHONY: git_diff
git_diff: ## Test whether there is no committed changes.
	git diff --exit-code

.PHONY: test_distribution_contain_all
test_distribution_contain_all: distribution
	$(MAKE) run_test_distribution_contain_all

.PHONY: run_test_distribution_contain_all
run_test_distribution_contain_all:
	OUTDIR=$(DIST_DIR) $(NODE_BIN) $(CURDIR)/tools/pkg_files_tester.js

.PHONY: test_esmodule_path_rewrite
test_esmodule_path_rewrite: distribution
	$(MAKE) run_test_esmodule_path_rewrite -C $(CURDIR)

.PHONY: run_test_esmodule_path_rewrite
run_test_esmodule_path_rewrite:
	OUTDIR=$(DIST_DIR) $(NODE_BIN) $(CURDIR)/tools/esmodule_path_rewrite_tester.js


###########################
# Tools
###########################
.PHONY: fmt
fmt: eslint_fmt ## Apply all formatters

.PHONY: eslint_fmt
eslint_fmt: 
	$(NPM_BIN)/eslint $(CURDIR) $(CURDIR)/**/.eslintrc.js --ext .js --fix


.PHONY: prepublish
prepublish: ## Run some commands for 'npm run prepublish'
	$(MAKE) clean -C $(CURDIR)
	$(MAKE) distribution -C $(CURDIR)
	$(MAKE) test_distribution_contain_all -C $(CURDIR)
	$(MAKE) run_test_esmodule_path_rewrite -C $(CURDIR)

.PHONY: publish
publish: prepublish ## Run some commands for 'npm publish'
	cd $(DIST_DIR) && npm publish

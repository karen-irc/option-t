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
DIST_MIXED_LIB_DIR := $(DIST_DIR)/lib
TEST_CACHE_DIR := $(CURDIR)/__test_cache
TMP_MJS_DIR := $(CURDIR)/__tmp_mjs
TMP_COMMONJS_DIR := $(CURDIR)/__tmp_cjs

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
	tmp_cjs \

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

.PHONY: clean_tmp_cjs
clean_tmp_cjs:
	$(NPM_BIN)/del $(TMP_COMMONJS_DIR)


###########################
# Build
###########################
.PHONY: distribution
distribution: build cp_docs cp_changelog cp_license cp_readme generate_manifest

.PHONY: build
build: build_cjs build_esm build_mixedlib ## Build all targets.

##### Build $(DIST_COMMONJS_DIR)
.PHONY: build_cjs
build_cjs: build_cjs__copy_cjs_to_dist_cjs build_cjs__copy_dts_to_dist_cjs ## Build `cjs/`.

.PHONY: build_cjs__copy_cjs_to_dist_cjs
build_cjs__copy_cjs_to_dist_cjs: build_cjs__rename_js_to_cjs clean_dist
	$(NPM_BIN)/cpx '$(TMP_COMMONJS_DIR)/**/*.cjs' $(DIST_COMMONJS_DIR) --preserve

.PHONY: build_cjs__copy_dts_to_dist_cjs
build_cjs__copy_dts_to_dist_cjs: build_cjs__create_tmp_cjs clean_dist
	$(NPM_BIN)/cpx '$(TMP_COMMONJS_DIR)/**/*.d.ts' $(DIST_COMMONJS_DIR) --preserve

.PHONY: build_cjs__rename_js_to_cjs
build_cjs__rename_js_to_cjs: build_cjs__create_tmp_cjs
	TARGET_DIR=$(TMP_COMMONJS_DIR) \
    $(NODE_BIN) $(CURDIR)/tools/extension_renamer/to_cjs.mjs

.PHONY: build_cjs__create_tmp_cjs
build_cjs__create_tmp_cjs: $(addprefix build_cjs__create_tmp_cjs__by_calling_, tsc babel cpx)

.PHONY: build_cjs__create_tmp_cjs_by_calling_tsc
build_cjs__create_tmp_cjs__by_calling_tsc: clean_tmp_cjs
	$(NPM_BIN)/tsc --project $(CURDIR)/tsconfig_cjs.json --outDir $(TMP_COMMONJS_DIR)

.PHONY: build_cjs__create_tmp_cjs_by_calling_babel
build_cjs__create_tmp_cjs__by_calling_babel: clean_tmp_cjs
	$(NPM_BIN)/babel $(SRC_DIR) \
    --out-dir $(TMP_COMMONJS_DIR) \
    --extensions=.js \
    --no-babelrc \
    --config-file $(CURDIR)/tools/babel/babelrc.cjs.js

.PHONY: build_cjs__create_tmp_cjs_by_calling_cpx
build_cjs__create_tmp_cjs__by_calling_cpx: clean_tmp_cjs
	$(NPM_BIN)/cpx '$(SRC_DIR)/**/*.d.ts' $(TMP_COMMONJS_DIR) --preserve


##### Build $(DIST_ESM_DIR)
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
	TARGET_DIR=$(TMP_MJS_DIR) \
    $(NODE_BIN) $(CURDIR)/tools/extension_renamer/to_mjs.mjs

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

##### Build $(DIST_MIXED_LIB_DIR)
.PHONY: build_mixedlib
build_mixedlib: build_mixedlib_cp_mjs build_mixedlib_cp_cjs build_mixedlib_cp_dts ## Build `lib/`.

.PHONY: build_mixedlib_cp_mjs
build_mixedlib_cp_mjs: build_esm clean_dist
	$(NPM_BIN)/cpx '$(DIST_ESM_DIR)/**/*.mjs' $(DIST_MIXED_LIB_DIR) --preserve

.PHONY: build_mixedlib_cp_cjs
build_mixedlib_cp_cjs: build_cjs clean_dist
	$(NPM_BIN)/cpx '$(DIST_COMMONJS_DIR)/**/*.cjs' $(DIST_MIXED_LIB_DIR) --preserve

.PHONY: build_mixedlib_cp_dts
build_mixedlib_cp_dts: build_esm clean_dist
	$(NPM_BIN)/cpx '$(DIST_ESM_DIR)/**/*.d.ts' $(DIST_MIXED_LIB_DIR) --preserve

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

.PHONY: generate_manifest
generate_manifest: clean_dist
	INPUT_MANIFEST_PATH=$(CURDIR)/package.json \
    OUTDIR=$(DIST_DIR) \
    $(NODE_BIN) $(CURDIR)/tools/package_json_rewriter/main.mjs


###########################
# Lint
###########################
.PHONY: lint
lint: eslint ## Run all lints

.PHONY: eslint
eslint:
	$(NPM_BIN)/eslint --ext=.js,.jsx,.mjs,.ts,.tsx $(CURDIR)/


###########################
# Test
###########################
.PHONY: build_test
build_test: build clean_test_cache
	$(NPM_BIN)/tsc --project $(CURDIR)/tsconfig_test.json --outDir $(TEST_CACHE_DIR)

.PHONY: run_ava
run_ava: build build_test
	$(MAKE) run_ava_only -C $(CURDIR)

.PHONY: run_ava_only
run_ava_only: ## Run ava only.
	$(NPM_BIN)/ava --config $(CURDIR)/ava.config.cjs

.PHONY: git_diff
git_diff: ## Test whether there is no committed changes.
	git diff --exit-code

.PHONY: test_distribution_contain_all
test_distribution_contain_all: distribution
	$(MAKE) run_test_distribution_contain_all

.PHONY: run_test_distribution_contain_all
run_test_distribution_contain_all:
	OUTDIR=$(DIST_DIR) $(NODE_BIN) $(CURDIR)/tools/pkg_files_tester.mjs

.PHONY: test_esmodule_path_rewrite
test_esmodule_path_rewrite: distribution
	$(MAKE) run_test_esmodule_path_rewrite -C $(CURDIR)

.PHONY: run_test_esmodule_path_rewrite
run_test_esmodule_path_rewrite:
	OUTDIR=$(DIST_DIR) $(NODE_BIN) $(CURDIR)/tools/esmodule_path_rewrite_tester.mjs

.PHONY: test_package_install
test_package_install: distribution __run_install_package
	$(MAKE) run_test_package_install -C $(CURDIR)
	$(MAKE) post_cleanup_to_test_package_install -C $(CURDIR)

.PHONY: __run_install_package
__run_install_package: distribution
	yarn add --dev $(DIST_DIR)

.PHONY: run_test_package_install
run_test_package_install:
	$(NODE_BIN) $(CURDIR)/tools/package_export_tester.mjs

.PHONY: post_cleanup_to_test_package_install
post_cleanup_to_test_package_install:
	$(MAKE) git_reset_to_head -C $(CURDIR)


###########################
# Tools
###########################
.PHONY: format
format: ## Apply formatters
	$(NPM_BIN)/prettier --write $(CURDIR)

.PHONY: format_check
format_check: ## Check code formatting
	$(NPM_BIN)/prettier --check $(CURDIR)

.PHONY: eslint_fix
eslint_fix: ## Apply ESLint's `--fix` mode
	$(NPM_BIN)/eslint --ext .js,.cjs,.mjs,.jsx,.ts,.tsx --fix $(CURDIR)/

.PHONY: generate_import_path_list_md
generate_import_path_list_md: ## Generate all public import paths to docs/import_path.md
	OUT_DIR=${DOCS_DIR} \
    SRC_DIR=${SRC_DIR} \
    $(NODE_BIN) $(CURDIR)/tools/generate_import_path_list_markdown.mjs

TARGETS_SHOULD_BE_RESET_AFTER_TEST_TO_INSTALL := \
  package.json \
  yarn.lock

.PHONY: git_reset_to_head
git_reset_to_head: $(TARGETS_SHOULD_BE_RESET_AFTER_TEST_TO_INSTALL)
	git checkout HEAD -- $(addprefix $(CURDIR)/, $^)


.PHONY: prepublish
prepublish: ## Run some commands for 'npm run prepublish'
	$(MAKE) clean -C $(CURDIR)
	$(MAKE) distribution -C $(CURDIR)
	$(MAKE) test_distribution_contain_all -C $(CURDIR)
	$(MAKE) run_test_esmodule_path_rewrite -C $(CURDIR)

.PHONY: publish
publish: prepublish ## Run some commands for 'npm publish'
	cd $(DIST_DIR) && npm publish

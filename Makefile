NPM_CMD := npm

all: help

help:
	@echo "Specify the task"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
	@exit 1


# Test
git_diff: # Test whether there is no committed changes.
	git diff --exit-code


# CI
.PHONY: ci
ci:
	$(NPM_CMD) test
	$(MAKE) git_diff

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Contributing](#contributing)
  - [Creating new issues](#creating-new-issues)
    - [Type of Issues](#type-of-issues)
  - [Pull Requests](#pull-requests)
- [Style](#style)
  - [Commits](#commits)
  - [JavaScript](#javascript)

## Contributing

### Creating new issues

Before creating a new issue, please check that it was not reported before.
If there is an old closed issue about the same bug, create a new issue and reference the old issue in the description.

When creating a new issue, use the `ISSUE_TEMPLATE`.

#### Type of Issues

|                           Label Name                           | `it-pebune/ani-research-web`                      | `it-pebune`                                      | Description                                        |
| :------------------------------------------------------------: | ------------------------------------------------- | ------------------------------------------------ | -------------------------------------------------- |
|         ![](https://img.shields.io/badge/-bug-d73a4a)          | [search :mag_right:][search-in-repo-bug]          | [search :mag_right:][search-in-org-bug]          | Bugs that need to be solved                        |
|     ![](https://img.shields.io/badge/-enchancement-a2eeef)     | [search :mag_right:][search-in-repo-enhancement]  | [search :mag_right:][search-in-org-enhancement]  | Feature requests                                   |
|     ![](https://img.shields.io/badge/-dependencies-0366d6)     | [search :mag_right:][search-in-repo-dependencies] | [search :mag_right:][search-in-org-dependencies] | Dependencies that needs to be updated              |
|    ![](https://img.shields.io/badge/-documentation-0075ca)     | [search :mag_right:][search-in-repo-docs]         | [search :mag_right:][search-in-org-docs]         | Documentation that needs to be updated             |
|    ![](https://img.shields.io/badge/-help%20wanted-008672)     | [search :mag_right:][search-in-repo-help]         | [search :mag_right:][search-in-org-help]         | Open to public solving / Clarification neeeded     |
| ![](https://img.shields.io/badge/-good%20first%20issue-7057ff) | [search :mag_right:][search-in-repo-fi]           | [search :mag_right:][search-in-org-fi]           | Good first issues for begginers                    |
|      ![](https://img.shields.io/badge/-duplicate-cfd3d7)       | [search :mag_right:][search-in-repo-duplicate]    | [search :mag_right:][search-in-org-duplicate]    | Issue that has been reported before                |
|       ![](https://img.shields.io/badge/-wontfix-ffffff)        | [search :mag_right:][search-in-repo-wontfix]      | [search :mag_right:][search-in-org-wontfix]      | Issues that the team decided will not be fixed now |

[search-in-repo-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Abug
[search-in-org-bug]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Abug
[search-in-repo-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Aenahncement
[search-in-org-enhancement]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Aenhancement
[search-in-repo-dependencies]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Adependencies
[search-in-org-dependencies]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Adependencies
[search-in-repo-docs]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Adocumentation
[search-in-org-docs]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Adocumentation
[search-in-repo-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Ahelp%20wanted
[search-in-org-help]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Ahelp%20wanted
[search-in-repo-fi]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Agood%20first%20issue
[search-in-org-fi]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Agood%20first%20issue
[search-in-repo-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Aduplicate
[search-in-org-duplicate]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Aduplicate
[search-in-repo-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+repo%3Ait-pebune%2Fani-research-web+label%3Awontfix
[search-in-org-wontfix]: https://github.com/search?q=is%3Aopen+is%3Aissue+user%3Ait-pebune+label%3Awontfix

### Pull Requests

When creating a new pull request, make use of the tags defined in the `README` and use the `PULL_REQUEST_TEMPLATE`.

## Style

### Commits

- Keep commit messages simple (max 72 chars)
- [Verify commits with signature](https://docs.github.com/en/authentication/managing-commit-signature-verification)

### JavaScript

Make sure ESLint & Prettier are run before you create a new PR.

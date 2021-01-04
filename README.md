# awards-leaderboard-ui

[![Build Status][CI Badge]][CI Branch]

This a leaderboard widget of users in a course with the top 10 awards. A maximum
of 10 awards will be shown for each user. The widget can be configured to
display users listed by top awards or top credits.

## Quick start

Options for getting started:

* Clone the repo: `git clone https://github.com/Brightspace/awards-leaderboard-ui.git`.

## BSI - Unbundled

To run this solution, you will need BSI
* Clone the repo `git clone https://github.com/Brightspace/brightspace-integration.git`
* Build BSI https://github.com/Brightspace/brightspace-integration#building--running-a-local-bsi
* Link BSI to your local web component for `d2l-awards-leaderboard-ui` (from name in package.json) https://github.com/Brightspace/brightspace-integration#running-locally-with-a-local-web-component
* (*Recommended*) Unbundle your build so that the UI will update with changes made to code https://github.com/Brightspace/brightspace-integration#using-the-script-to-unbundle-your-build

## Dependencies

This solution is run by widget code within the LMS
* [Awards Leaderboard](https://git.dev.d2l/projects/CORE/repos/lms/browse/awards-leaderboard)

This also makes Valence API calls to Awards tool
* [Valence Awards API](https://docs.valence.desire2learn.com/res/awards.html)

## Demo

There is a demo page. To serve it, run the following commands:
* `npm i`
* `npm start`
This will auto open a demo page for viewing and will respond to changes.

This comes with sample data and a sample full view, medium view and mobile view as there are distinctions between them.

## Tests

There are tests with this repo that run within CI. To test them locally within a
browser, run

```
npm test
```

## Versioning

Awards Leaderboard is maintained under [the Semantic Versioning guidelines](http://semver.org/).

Include either `[increment major]`, `[increment minor]` or `[increment patch]`
in your merge commit title to automatically increment the `package.json`
version and create a tag and GitHub release. This must be done when merging the
pull request.

![Versioning example](docs/img/merge-commit-title.png)

To update BSI to use a new version:
* Ensure awards-leaderboard-ui is no longer linked to bsi - Follow Option 2 https://github.com/Brightspace/brightspace-integration#running-locally---bundled-production-build
* Don't forget to restart IIS
* Within BSI, run the following commands:
  * `rm package-lock.json`
  * `rm -rf node_modules`
  * `npm i --package-lock`
  * `npm install`
  * `npm run build`
* Ensure everything is working as expected
* Bump BSI by updating the `package-lock.json` file
  * Ensure `package-lock.json` has picked up the new version revision for awards-leaderboard-ui

<!-- links -->
[CI Branch]:https://travis-ci.com/Brightspace/awards-leaderboard-ui
[CI Badge]:https://travis-ci.com/Brightspace/awards-leaderboard-ui.svg?branch=master

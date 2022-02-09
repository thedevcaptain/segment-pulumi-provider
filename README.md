# Pulumi Dynamic Provider for Twilio Segment Configuration

This is a Pulumi Dynamic Provider to operate on Twilio Segments Configurations API as Code.

[![npm](https://img.shields.io/npm/v/segment-pulumi-provider.svg?label=Version)](https://www.npmjs.com/package/segment-pulumi-provider)
[![GitHub last commit](https://img.shields.io/github/last-commit/thedevcaptain/segment-pulumi-provider.svg)](https://github.com/PirataFrancis/segment-pulumi-provider/commits/main)

## Next in Line
- Update Source
- CRUD on Destinations

## Changelog

Please refer to [CHANGELOG.md](https://github.com/thedevcaptain/interfejs/blob/master/CHANGELOG.md) for release-to-release detail.

## Pre-requisite
- Pulumi CLI (ˆ3.0.0)
- A pulumi project

## Before installing

1) Create/Get an Access Token for the desired Segment workspace (https://segment.com/docs/config-api/authentication/)
2) Add that token as an environment variable called `SEGMENT_ACCESS_TOKEN`
3) On your pulumi project run `pulumi config set segment:workspace YOUR_WORKSPACE_NAME` to set the workspace of the pulumi project

## Installation
To install run via npm: 
```
npm run install segment-pulumi-provider
```

This package has a `peerDependency`, so you need to install it:
```
npm install @pulumi/pulumi
```
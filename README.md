# F1 Telemetry App

A fairly simple F1 2021 Game broadcasting and data collection tool.

<img src="https://user-images.githubusercontent.com/1449463/159109120-dcfeed67-55fe-40bc-9725-8383b92eadd8.png" width="500" />
<img src="https://user-images.githubusercontent.com/1449463/159109128-8c910ff4-69bb-4fcf-8bca-31d4435dfe75.png" width="500" />

## Usage

### Downloading

To use this application, simply navigate to the [releases](https://github.com/chaseconey/f1-telemetry-app/releases) and pick up the latest release for your platform!

_Note: you may have to select that you accept the file as legitimate on some distros._

### Telemetry Settings

This app uses the normal in-game telemetry that you might have used before. The recommended settings are as follows:

- UDP Telemetry: On
- UDP Broadcast Mode: Off|On
- UDP IP Address: If Broadcast Mode Off, put your computer's IP address here
- UDP Port: 20777 (default)
- UDP Format: 2021

### Automatic Data File

This app was designed to work with the [League Portal](https://github.com/chaseconey/frl) and as such will automatically download the data from each session.

As of right now, this file automatically goes into your Downloads directory, but this will be configurable later.

### Driver Name Map

By default, the app will only show you racing numbers, as the name is not available on all platforms. If you would like to map names to those drivers, you can make a simple csv file that looks like so:

```
2,TheDude
8,AnotherDude
```

Then you can simply click `File > Load Driver Map` and select your csv.

### TODO

In no particular order

- Fix fastest lap info (event not firing?)
- Allow clicking on a driver to get lap data (already in store)
- Add options for port and whatnot
- Add damage to session overview

<!--
 ___ _            _ _    _ _    __
/ __(_)_ __  _ __| (_)__(_) |_ /_/
\__ \ | '  \| '_ \ | / _| |  _/ -_)
|___/_|_|_|_| .__/_|_\__|_|\__\___|
            |_| 
-->
![](https://docs.simplicite.io//logos/logo250.png)
* * *

`RestaurantsDemo` module definition
===================================

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=simplicite-modules-RestaurantsDemo&metric=alert_status)](https://sonarcloud.io/dashboard?id=simplicite-modules-RestaurantsDemo)

### Introduction

This module is a very simple restaurant rating application demo
inspired by a famous travelers' advisor service.

The frontend is a [NodeRED&reg;](https://nodered.org) web application.

### Import

To import this module:

- Create a module named `RestaurantsDemo`
- Set the settings as:

```json
{
	"type": "git",
	"origin": {
		"uri": "https://github.com/simplicitesoftware/module-restaurants.git"
	}
}
```

- Click on the _Import module_ button

### Configure backend

In order to have the frontend working the password for the
webservices-only user `rstfrontend` must be `simplicite`.

This can be achieved by importing the following XML:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<simplicite xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.simplicite.fr/base" xsi:schemaLocation="http://www.simplicite.fr/base https://www.simplicite.io/resources/schemas/base.xsd">
<object>
	<name>UserPwd</name>
	<action>update</action>
	<data>
		<usr_login_read>rstfrontend</usr_login_read>
		<usr_password>simplicite</usr_password>
	</data>
</object>
</simplicite>
```

### Load dataConfigure frontend

Install [NodeRED&reg;](https://nodered.org).

Start it with your Google API key set as a environment variable: `GOOGLE_API_KEY=_myapikey_ node-red`

In the NodeRED flow editor add the following nodes to the nodes palette (in the main menu choose the _Manage palette_ option):

- Simplicité nodes: `node-red-contrib-simplicite`
- Sentiment analysis nodes: `node-red-node-sentiment`
- Watson nodes: `node-red-node-watson`

Import the flows available in the `RST_NODERED_NODES` resource of the module.

Configure the config node with your instance settings.

`RstLocation` business object definition
----------------------------------------

Location

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `rstLocName`                                                 | char(100)                                | yes*     | yes       |          | Location name                                                                    |
| `rstLocState`                                                | enum(2) using `RST_STATES` list          | yes*     | yes       |          | Location state                                                                   |
| `rstLocDescription`                                          | html(4000)                               |          | yes       |          | Location description                                                             |
| `rstLocCoordinates`                                          | geocoords                                | yes      | yes       |          | Location coordinates                                                             |
| `rstLocExtent`                                               | int(10)                                  | yes      | yes       |          | Location extent (miles)                                                          |

### Lists

* `RST_STATES`
    - `AL` Alabama
    - `AK` Alaska
    - `AZ` Arizona
    - `AR` Arkansas
    - `CA` California
    - `CO` Colorado
    - `CT` Connecticut
    - `DE` Delaware
    - `DC` District of Columbia
    - `FL` Florida
    - `GA` Georgia
    - `HI` Hawaii
    - `ID` Idaho
    - `IL` Illinois
    - `IN` Indiana
    - `IA` Iowa
    - `KS` Kansas
    - `KY` Kentucky
    - `LA` Louisiana
    - `ME` Maine
    - `MD` Maryland
    - `MA` Massachusetts
    - `MI` Michigan
    - `MN` Minnesota
    - `MS` Mississippi
    - `MO` Missouri
    - `MT` Montana
    - `NE` Nebraska
    - `NV` Nevada
    - `NH` New Hampshire
    - `NJ` New Jersey
    - `NM` New Mexico
    - `NY` New York
    - `NC` North Carolina
    - `ND` North Dakota
    - `OH` Ohio
    - `OK` Oklahoma
    - `OR` Oregon
    - `PA` Pennsylvania
    - `RI` Rhode Island
    - `SC` South Carolina
    - `SD` South Dakota
    - `TN` Tennessee
    - `TX` Texas
    - `UT` Utah
    - `VT` Vermont
    - `VA` Virginia
    - `WA` Washington
    - `WV` West Virginia
    - `WI` Wisconsin
    - `WY` Wyoming

### Custom actions

* `RstLoadRestaurants`: Refresh all restaurants' data

`RstRestaurant` business object definition
------------------------------------------

Restaurant (as referenced as POI in OpenStreetMap) + extra data
The restaurants without a name or a state are ignored

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `rstRstName`                                                 | char(100)                                | yes*     |           |          | Name                                                                             |
| `rstRstState`                                                | enum(2) using `RST_STATES` list          |          |           |          | State (e.g. `NY`)                                                                |
| `rstRstCuisine`                                              | char(50)                                 |          |           |          | Cuisine type                                                                     |
| `rstRstWebSite`                                              | url(100)                                 |          |           |          | Web site                                                                         |
| `rstRstAddress`                                              | char(255)                                |          |           |          | Address                                                                          |
| `rstRstCoordinates`                                          | geocoords                                |          |           |          | Geographical coordinates                                                         |
| `rstRstTimestamp`                                            | datetime                                 |          |           |          | Data timestamp                                                                   |
| `rstRstStatus`                                               | enum(10) using `RST_STATUS` list         |          | yes       |          | Status                                                                           |
| `rstRstNbComments`                                           | int(10)                                  |          |           |          | Number of comments                                                               |
| `rstRstRating`                                               | float(11, 0)                             |          |           |          | Rating                                                                           |
| `rstRstDescription`                                          | html(4000)                               |          | yes       |          | Description                                                                      |
| `rstRstPicture`                                              | image                                    |          | yes       |          | Picture                                                                          |
| `rstRstLocId` link to **`RstLocation`**                      | id                                       | yes      | yes       |          | -                                                                                |
| _Ref. `rstRstLocId.rstLocName`_                              | _char(100)_                              |          |           |          | _Location name_                                                                  |
| _Ref. `rstRstLocId.rstLocState`_                             | _enum(2) using `RST_STATES` list_        |          |           |          | _Location state_                                                                 |
| _Ref. `rstRstLocId.rstLocCoordinates`_                       | _geocoords_                              |          |           |          | _Location coordinates_                                                           |
| _Ref. `rstRstLocId.rstLocExtent`_                            | _int(10)_                                |          |           |          | _Location extent (miles)_                                                        |

### Lists

* `RST_STATES`
    - `AL` Alabama
    - `AK` Alaska
    - `AZ` Arizona
    - `AR` Arkansas
    - `CA` California
    - `CO` Colorado
    - `CT` Connecticut
    - `DE` Delaware
    - `DC` District of Columbia
    - `FL` Florida
    - `GA` Georgia
    - `HI` Hawaii
    - `ID` Idaho
    - `IL` Illinois
    - `IN` Indiana
    - `IA` Iowa
    - `KS` Kansas
    - `KY` Kentucky
    - `LA` Louisiana
    - `ME` Maine
    - `MD` Maryland
    - `MA` Massachusetts
    - `MI` Michigan
    - `MN` Minnesota
    - `MS` Mississippi
    - `MO` Missouri
    - `MT` Montana
    - `NE` Nebraska
    - `NV` Nevada
    - `NH` New Hampshire
    - `NJ` New Jersey
    - `NM` New Mexico
    - `NY` New York
    - `NC` North Carolina
    - `ND` North Dakota
    - `OH` Ohio
    - `OK` Oklahoma
    - `OR` Oregon
    - `PA` Pennsylvania
    - `RI` Rhode Island
    - `SC` South Carolina
    - `SD` South Dakota
    - `TN` Tennessee
    - `TX` Texas
    - `UT` Utah
    - `VT` Vermont
    - `VA` Virginia
    - `WA` Washington
    - `WV` West Virginia
    - `WI` Wisconsin
    - `WY` Wyoming
* `RST_STATUS`
    - `CLOSED` Code CLOSED
    - `OPEN` Code OPEN

`RstComments` business object definition
----------------------------------------

Customer comments on a restaurant. Includes:

* an quantified evaluation
* free text comments

### Fields

| Name                                                         | Type                                     | Required | Updatable | Personal | Description                                                                      |
|--------------------------------------------------------------|------------------------------------------|----------|-----------|----------|----------------------------------------------------------------------------------|
| `rstCmtDateTime`                                             | datetime                                 | yes*     |           |          | Date and time                                                                    |
| `rstCmtEmail`                                                | char(100)                                | yes      | yes       |          | Customer's name                                                                  |
| `rstCmtRstId` link to **`RstRestaurant`**                    | id                                       | yes*     | yes       |          | Restaurant                                                                       |
| _Ref. `rstCmtRstId.rstRstName`_                              | _char(100)_                              |          |           |          | _Name_                                                                           |
| _Ref. `rstCmtRstId.rstRstAddress`_                           | _char(255)_                              |          |           |          | _Address_                                                                        |
| _Ref. `rstCmtRstId.rstRstState`_                             | _enum(2) using `RST_STATES` list_        |          |           |          | _State (e.g. `NY`)_                                                              |
| `rstCmtEval`                                                 | int(1) using `RST_EVAL` list             | yes      | yes       |          | Evaluation                                                                       |
| `rstCmtSentiment`                                            | int(2)                                   |          | yes       |          | Sentiment score                                                                  |
| `rstCmtComments`                                             | text(4000)                               |          | yes       |          | Free text comments in **native** language                                        |
| `rstCmtCommentsInEnglish`                                    | text(4000)                               |          |           |          | Free text comments translated in **english**                                     |
| `rstCmtTones`                                                | text(4000)                               |          | yes       |          | Watson tones                                                                     |
| `rstCmtVisible`                                              | boolean                                  |          | yes       |          | Visible?                                                                         |

### Lists

* `RST_STATES`
    - `AL` Alabama
    - `AK` Alaska
    - `AZ` Arizona
    - `AR` Arkansas
    - `CA` California
    - `CO` Colorado
    - `CT` Connecticut
    - `DE` Delaware
    - `DC` District of Columbia
    - `FL` Florida
    - `GA` Georgia
    - `HI` Hawaii
    - `ID` Idaho
    - `IL` Illinois
    - `IN` Indiana
    - `IA` Iowa
    - `KS` Kansas
    - `KY` Kentucky
    - `LA` Louisiana
    - `ME` Maine
    - `MD` Maryland
    - `MA` Massachusetts
    - `MI` Michigan
    - `MN` Minnesota
    - `MS` Mississippi
    - `MO` Missouri
    - `MT` Montana
    - `NE` Nebraska
    - `NV` Nevada
    - `NH` New Hampshire
    - `NJ` New Jersey
    - `NM` New Mexico
    - `NY` New York
    - `NC` North Carolina
    - `ND` North Dakota
    - `OH` Ohio
    - `OK` Oklahoma
    - `OR` Oregon
    - `PA` Pennsylvania
    - `RI` Rhode Island
    - `SC` South Carolina
    - `SD` South Dakota
    - `TN` Tennessee
    - `TX` Texas
    - `UT` Utah
    - `VT` Vermont
    - `VA` Virginia
    - `WA` Washington
    - `WV` West Virginia
    - `WI` Wisconsin
    - `WY` Wyoming


![](https://www.simplicite.io/resources//logos/logo250.png)
* * *

`RestaurantsDemo` module definition
===================================

This module is a demo inspired from a famous travelers
advisor web sites.

It is the backend to a NodeRED&reg; frontend web application.

`RstComments` business object definition
----------------------------------------

Customer comments on a restaurant. Includes:

* an quantified evaluation
* free text comments

### Fields

| Name                                                         | Type                                     | Req | Upd | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | --- | --- | -------------------------------------------------------------------------------- |
| `rstCmtDateTime`                                             | datetime                                 | x*  |     | Date and time                                                                    |
| `rstCmtEmail`                                                | char(100)                                | x   | x   | Customer's name                                                                  |
| `rstCmtRstId` link to **`RstRestaurant`**                    | id                                       | x*  | x   | Restaurant                                                                       |
| _Ref. `rstCmtRstId.rstRstName`_                              | _char(100)_                              |     |     | _Name_                                                                           |
| _Ref. `rstCmtRstId.rstRstAddress`_                           | _char(255)_                              |     |     | _Address_                                                                        |
| _Ref. `rstCmtRstId.rstRstState`_                             | _enum(7) using `RST_STATES` list_        |     |     | _State (e.g. `NY`)_                                                              |
| `rstCmtEval`                                                 | enum(7) using `RST_EVAL` list            | x   | x   | Evaluation                                                                       |
| `rstCmtSentiment`                                            | int(2)                                   |     | x   | Sentiment score                                                                  |
| `rstCmtComments`                                             | text(4000)                               |     | x   | Free text comments                                                               |
| `rstCmtCommentsInEnglish`                                    | text(4000)                               |     |     | Free text coomments translated in english                                        |
| `rstCmtTones`                                                | text(4000)                               |     | x   | Watson tones                                                                     |
| `rstCmtVisible`                                              | boolean                                  |     | x   | Visible?                                                                         |

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
* `RST_EVAL`
    - `100` Very good
    - `75` Good
    - `50` Average
    - `25` Bad
    - `0` Very bad

### Custom actions

No custom action

`RstLocation` business object definition
----------------------------------------

Location

### Fields

| Name                                                         | Type                                     | Req | Upd | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | --- | --- | -------------------------------------------------------------------------------- |
| `rstLocName`                                                 | char(100)                                | x*  | x   | Location name                                                                    |
| `rstLocState`                                                | enum(7) using `RST_STATES` list          | x*  | x   | Location state                                                                   |
| `rstLocDescription`                                          | html(4000)                               |     | x   | Location description                                                             |
| `rstLocCoordinates`                                          | geocoords                                | x   | x   | Location coordinates                                                             |
| `rstLocExtent`                                               | int(10)                                  | x   | x   | Location extent (miles)                                                          |

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

| Name                                                         | Type                                     | Req | Upd | Description                                                                      | 
| ------------------------------------------------------------ | ---------------------------------------- | --- | --- | -------------------------------------------------------------------------------- |
| `rstRstName`                                                 | char(100)                                | x*  |     | Name                                                                             |
| `rstRstState`                                                | enum(7) using `RST_STATES` list          |     |     | State (e.g. `NY`)                                                                |
| `rstRstCuisine`                                              | char(50)                                 |     |     | Cuisine type                                                                     |
| `rstRstWebSite`                                              | url(100)                                 |     |     | Web site                                                                         |
| `rstRstAddress`                                              | char(255)                                |     |     | Address                                                                          |
| `rstRstCoordinates`                                          | geocoords                                |     |     | Geographical coordinates                                                         |
| `rstRstTimestamp`                                            | datetime                                 |     |     | Data timestamp                                                                   |
| `rstRstStatus`                                               | enum(7) using `RST_STATUS` list          |     | x   | Status                                                                           |
| `rstRstNbComments`                                           | int(10)                                  |     |     | Number of comments                                                               |
| `rstRstRating`                                               | float(11, 0)                             |     |     | Rating                                                                           |
| `rstRstDescription`                                          | html(4000)                               |     | x   | Description                                                                      |
| `rstRstPicture`                                              | image                                    |     | x   | Picture                                                                          |
| `rstRstLocId` link to **`RstLocation`**                      | id                                       | x   | x   | -                                                                                |
| _Ref. `rstRstLocId.rstLocName`_                              | _char(100)_                              |     |     | _Location name_                                                                  |
| _Ref. `rstRstLocId.rstLocState`_                             | _enum(7) using `RST_STATES` list_        |     |     | _Location state_                                                                 |
| _Ref. `rstRstLocId.rstLocCoordinates`_                       | _geocoords_                              |     |     | _Location coordinates_                                                           |
| _Ref. `rstRstLocId.rstLocExtent`_                            | _int(10)_                                |     |     | _Location extent (miles)_                                                        |

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

### Custom actions

No custom action


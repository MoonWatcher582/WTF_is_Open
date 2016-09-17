WTF_is_Open

What the Fuck is Open gives the user a list of open restaurants, bars, etc that are still open around them.
Implemented using Google Places API.

First page, featuring a sort-by option (distance, prominence), a distance input, and a location finder to be added.
Map/Direction functionality to be added.

Live website available at http://wtfisopen.com

(9/16/16) Note: Google API's have disabled use of certain services over insecure connection, so we are rewriting the server using HTTP/2 protocol. Looking at several options, we decided to move forward with Golang because its http package serves over http2 by default.

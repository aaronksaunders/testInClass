##Second Sample Appcelerator Alloy Mobile Project for Howard U SCS Cross-Platform Mobile App Dev Class

* Project is based off of the default 2 Tab template available in Titanium Studio.
* Project is a sample demonstrating the use of the following features
  * Titatium ListView
  * Titanium Camera & Photo Gallery Integration
  * Appcelerator Cloud Service `ti.cloud` module, User and Photo Objects covered
  * Date and Time manipulation using `moment.js`
  * Javascript library`q` for promises integration
* This code should run successfully on IOS and Android using the Appcelerator 3.5.0 SDK *( Android Map Integration Not Tested )* 
* Concepts here are meant to be a introductory guide to concepts covered in my book on Appcelerator Alloy and Appcelerator Cloud Services

![text](screens/small_book_cover.png)

#####[Available On Amazon.com](http://www.amazon.com/Building-Cross-Platform-Titanium-Appcelerator-Services/dp/1118673255)
____
Link to presentation on Slideshare.net - http://www.slideshare.net/aaronksaunders/howard-class-day12
____
###Getting Started
Please setup your constants by modifying the file [`tiapp.xml`](tiapp.xml) in the `root` directory of your project

##### Appcelerator Cloud Service Support
Modify the code below to use your values from the Appcelerator Cloud Services console. The information can be found at http://my.appcelerator.com. If you are starting with a new project you created in Appcelerator Studio, you can cloud enable the application at creation and skip this step.

Be sure to used the development key. Note that if you are starting your project from scratch, this step is not needed if you have cloud enabled your application

````Javascript
<property name="acs-api-key-development" type="string">YOR VALUE HERE</property>
````
##### Appcelerator IOS Map Support

[http://docs.appcelerator.com/titanium/latest/#!/guide/iOS_Map_Kit](http://docs.appcelerator.com/titanium/latest/#!/guide/iOS_Map_Kit)

Be sure to add the appropriate keys to your `tiapp.xml` to support map integration on IOS
````HTML
<ios>
    <plist>
        <dict>
            <key>UIBackgroundModes</key>
            <array>
                <string>location</string>
            </array>
            <key>NSLocationAlwaysUsageDescription</key>
            <string>HU Class Sample App</string>
            <key>NSLocationWhenInUseUsageDescription</key>
            <string>HU Class Sample App</string>
            <!-- Other Key Excluded For Purpose of Documentation -->
        </dict>
    </plist>
</ios>
````
##### Setup Google Maps API Key (Android Map Support Coming Soon)

[http://docs.appcelerator.com/titanium/latest/#!/guide/Google_Maps_v2_for_Android](http://docs.appcelerator.com/titanium/latest/#!/guide/Google_Maps_v2_for_Android)

Refer to the "Obtain a Google Maps API key" section [here](https://developers.google.com/maps/documentation/android/start#getting_the_google_maps_android_api_v2) and replace the google maps API key in `tiapp.xml`:

````HTML
<meta-data android:name="com.google.android.maps.v2.API_KEY" android:value="..."/>
````
----------------------------------
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are 
trademarks of Appcelerator, Inc. 

Titanium is Copyright (c) 2008-2013 by Appcelerator, Inc. All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.


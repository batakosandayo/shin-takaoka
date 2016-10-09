$(function() {  
    var watchId;
    var geocoder;
    var getLat;
    var getLng;

    $(window).load(function () {
        getAddress();
    });

    //位置情報を取得する
    function getGPS(){
        var dfd = new $.Deferred();

        // Geolocationが使用可能かチェック
        if( !window.navigator.geolocation ) dfd.reject();

             // 現在地の取得
             window.navigator.geolocation.getCurrentPosition(
            // Success
            function(position){
                dfd.resolve(position);
            },
            // Error
            function(error){
                dfd.reject();
            },
            // Options
            {
                enableHighAccuracy:true, //位置情報の精度を高く
                timeout: 10000, //10秒でタイムアウト
                maximumAge: 600000 //10分間有効
            }
        );

        return dfd.promise();
    }

    //位置情報を追跡する
    function watchGPS() {
        // Geolocation APIに対応している
        if (navigator.geolocation) {
            var dfd = $.Deferred();

            // Geolocationが使用可能かチェック
            if (!window.navigator.geolocation) dfd.reject();

            // 現在地の取得
            watchId = window.navigator.geolocation.watchPosition(
           // Success
           function (position) {
               dfd.resolve(position);
           },
           // Error
           function (error) {
               dfd.reject();
           },
           // Options
           {
               enableHighAccuracy: true, //位置情報の精度を高く
               timeout: 1000000, //1000秒でタイムアウト
               maximumAge: 0
           }
       );

            return dfd.promise();
        }
    }

    // 位置情報の追跡を中止する
    function stopGPS() {
        alert("位置情報取得を中止します。");
        navigator.geolocation.clearWatch(watchId);
    }

    //緯度・経度から住所を取得する
    function getAddress() {
        alert("getAddress");
        // データが取得できた段階でソートを開始
        getGPS().then(
            function (position) {

                // 現在地
                getLat = position.coords.latitude;
                getLng = position.coords.longitude;

                //住所を取得する
                geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(getLat, getLng);
                alert("test" + latlng);

                eocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    alert("ジオコーディング");
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            $("div").text("現在地:" + results[0].formatted_address);
                        } else {
                            $("div").text("現在地:" + "住所が取得できませんでした");
                        }
                    }
                    else {
                        $("div").text("現在地:" + "住所が取得できませんでした" + status);
                    }
                });
            },
             function (error) {
                 // 位置情報取得エラー
                 $("div").text("現在地:" + "住所が取得できませんでした" + status);
             });

    }

});
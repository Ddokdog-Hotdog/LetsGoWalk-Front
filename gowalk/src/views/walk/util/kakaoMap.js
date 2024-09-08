/* global kakao */
import { kakaoApiKey } from "@/views/walk/util/config";

export const loadKakaoMapScript = (callback) => {
    if (window.kakao && window.kakao.maps) {
        callback();
    } else {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${kakaoApiKey}&libraries=services,clusterer,drawing`;
        script.onload = () => {
            kakao.maps.load(callback);
        };
        document.head.appendChild(script);
    }
};

export const initializeMap = (containerId, lat, lng, level = 4) => {
    const container = document.getElementById(containerId);
    const options = {
        center: new kakao.maps.LatLng(lat, lng),
        level: level,
    };
    return new kakao.maps.Map(container, options);
};

export const getUserLocation = (successCallback, errorCallback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.error("Geolocation을 지원하지 않는 브라우저");
        if (errorCallback) errorCallback();
    }
};

export const createMarker = (position, markerImage, map) => {
    const markerPosition = new kakao.maps.LatLng(position[0], position[1]);
    const marker = new kakao.maps.Marker({
        position: markerPosition,
        image: markerImage,
    });
    marker.setMap(map);
    return marker;
};

export const markerImages = {
    default: function () {
        return this.markerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            [40, 40],
            [20, 40]
        );
    },
    restaurant: function () {
        return this.markerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            [30, 30],
            [15, 30]
        );
    },
    park: function () {
        return this.markerImage(
            "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png",
            [50, 50],
            [25, 50]
        );
    },
    myPosition: function () {
        return this.markerImage(require("@/assets/marker/currentLocation.png"), [35, 35], [19, 19]);
    },
    markerImage(src, size, off) {
        const imageSrc = src;
        const imageSize = new kakao.maps.Size(size[0], size[1]);
        const imageOption = { offset: new kakao.maps.Point(off[0], off[1]) };

        return new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
    },
};

export const drawPolyline = (path, map) => {
    console.log("경로 그리기: ", path);
    const polyline = new kakao.maps.Polyline({
        path: path.map((point) => new kakao.maps.LatLng(point.location.coordinates[1], point.location.coordinates[0])),
        strokeWeight: 5,
        strokeColor: "#699BF7",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
    });

    polyline.setMap(map);
    return polyline;
};

// export const drawWalk = (path, map) => {
//     console.log("경로 그리기: ", path);
//     if (!path || path.length === 0) {
//         console.warn("경로가 비어있습니다.");
//         return null;
//     }
//     const polyline = new kakao.maps.Polyline({
//         path: path.map((point) => new kakao.maps.LatLng(point.location.coordinates[1], point.location.coordinates[0])),
//         strokeWeight: 5,
//         strokeColor: "699BF7",
//         strokeOpacity: 0.7,
//         strokeStyle: "solid",
//     });
//     polyline.setMap(map);
//     return polyline;

//     //중심위치 설정해야함
//     // this.placeMarkerAtStart(walk.startLocation);
// };

export const drawWalk = (path, map) => {
    console.log("경로 그리기: ", path);
    if (!path || path.length === 0) {
        console.warn("경로가 비어있습니다.");
        return null;
    }

    // 좌표 데이터 확인 및 변환
    const coordinates = path
        .map((point) => {
            if (point.location && point.location.coordinates) {
                const [lng, lat] = point.location.coordinates;
                return new kakao.maps.LatLng(lat, lng);
            } else {
                console.warn("잘못된 좌표 형식:", point);
                return null;
            }
        })
        .filter((coord) => coord !== null);

    const polyline = new kakao.maps.Polyline({
        path: coordinates,
        strokeWeight: 5,
        strokeColor: "#699BF7",
        strokeOpacity: 0.7,
        strokeStyle: "solid",
    });
    polyline.setMap(map);

    const bounds = new kakao.maps.LatLngBounds();
    coordinates.forEach((coordinate) => bounds.extend(coordinate));
    map.setBounds(bounds);

    return polyline;
};

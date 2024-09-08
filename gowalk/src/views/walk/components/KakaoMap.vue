<template>
    <div>
        <div id="map"></div>
    </div>
</template>

<script>
/* global kakao */
import {
    loadKakaoMapScript,
    initializeMap,
    getUserLocation,
    markerImages,
    createMarker,
    drawPolyline,
    drawWalk,
} from "@/views/walk/util/kakaoMap";
import { defaultPosition } from "@/views/walk/util/config";
import { mapMutations, mapState } from "vuex";
export default {
    name: "KakaoMap",
    props: {
        enablePolyline: {
            type: Boolean,
            default: false,
        },
        enableSummary: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            map: null,
            marker: null,
            polyline: null,
            polylines: [],
        };
    },
    computed: {
        ...mapState({
            route: (state) => state.walkStore.walks.route,
            curLocation: (state) => state.walkStore.walks.curLocation,
            dailyWalk: (state) => state.walkStore.dailyWalks,
            monthlyWalk: (state) => state.walkStore.monthlyWalk,
        }),
    },
    mounted() {
        loadKakaoMapScript(this.initMapWithUserLocation);
    },
    watch: {
        route: {
            handler(newRoute) {
                if (this.enablePolyline && newRoute.length > 0) {
                    this.drawRoutePolyline(newRoute);
                }
            },

            deep: true, // 객체 내부 변화를 감지하기 위해 deep 옵션 설정
        },
        curLocation: {
            handler(newLocation) {
                if (newLocation && this.map) {
                    // 지도 중심을 현재 위치로 설정
                    this.map.setCenter(new kakao.maps.LatLng(newLocation.lat, newLocation.lng));
                    // 현재 위치 마커를 업데이트
                    if (this.marker) {
                        this.marker.setPosition(new kakao.maps.LatLng(newLocation.lat, newLocation.lng));
                    } else {
                        this.marker = createMarker(
                            [newLocation.lat, newLocation.lng],
                            markerImages.myPosition(),
                            this.map
                        );
                    }
                }
            },
            immediate: true, // 컴포넌트가 로드될 때도 현재 위치로 초기화
            deep: true,
        },
    },
    methods: {
        ...mapMutations("walkStore", ["setCurLocation"]),
        initMapWithUserLocation() {
            getUserLocation(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    this.map = initializeMap("map", lat, lng);

                    this.marker = createMarker([lat, lng], markerImages.myPosition(), this.map);
                    console.log(`카카오맵 초기화 현재위치: ${lat}, ${lng} `);
                    this.setCurLocation({ lat, lng });

                    if (this.enablePolyline && this.route.length > 0) {
                        this.drawRoutePolyline(this.route);
                    }
                },
                () => {
                    this.map = initializeMap("map", defaultPosition[0], defaultPosition[1]); // 기본 위치로 지도 초기화
                }
            );
        },
        drawRoutePolyline() {
            if (this.polyline) {
                this.polyline.setMap(null); // 기존 경로 제거
            }
            this.polyline = drawPolyline(this.route, this.map); // 새로운 경로 그리기
        },
        drawDailyWalks() {
            this.clearPolyLines();
            const polyline = this.dailyWalk.map((walk) => drawWalk(walk.route, this.map));

            if (polyline) {
                this.polylines.push(polyline);
            }
        },
        drawMonthlyWalks() {
            this.clearPolyLines();
            this.monthlyWalk.dailyWalks.forEach((day) => {
                const polyline = day.walks.map((walk) => drawWalk(walk.route, this.map)); // 월별 폴리라인 추가

                if (polyline) {
                    this.polylines.push(polyline);
                }
            });
        },
        clearPolyLines() {
            console.log("경로 지우기: ", this.polylines);
            this.polylines.forEach((polyline) => {
                if (polyline && typeof polyline.setMap === "function") {
                    polyline.setMap(null);
                }
            });
            this.polylines = [];
        },
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>

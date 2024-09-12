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
    drawWalkWithoutBounds,
} from "@/views/walk/util/kakaoMap";
import { nearbyWalks, nearbyHotplace } from "@/views/walk/util/walkApi";
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
        enableNearby: {
            type: Boolean,
            default: false,
        },
        enableHotplace: {
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
            hotspotMarkers: [],
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
        this.checkProps();
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
        checkProps() {
            if (this.enableNearby) {
                this.drawWalkNearBy();
            }
            if (this.enableHotplace) {
                this.showHotplace();
            }
        },
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
            if (!this.enableSummary) {
                return;
            }
            this.clearPolyLines();
            if (this.dailyWalk) {
                const polylines = drawWalk(this.dailyWalk, this.map);
                if (polylines && polylines.length > 0) {
                    this.polylines.push(...polylines);
                }
            } else {
                console.warn("일일 걷기 데이터가 없습니다.");
            }
        },
        clearPolyLines() {
            // console.log("경로 지우기: ", this.polylines);
            this.polylines.forEach((polyline) => {
                if (polyline && typeof polyline.setMap === "function") {
                    polyline.setMap(null);
                }
            });
            this.polylines = [];
        },
        drawMonthlyWalks() {
            if (!this.enableSummary) {
                return;
            }
            this.clearPolyLines();
            this.monthlyWalk.dailyWalks.forEach((day) => {
                const polylines = drawWalk(day.walks, this.map);
                if (polylines && polylines.length > 0) {
                    this.polylines.push(...polylines);
                }
            });
        },
        async drawWalkNearBy() {
            const walks = await this.searchNearby(this.curLocation);
            this.clearPolyLines();
            const polylines = drawWalkWithoutBounds(walks, this.map);
            if (polylines && polylines.length > 0) {
                this.polylines.push(...polylines);
            }
        },
        async searchNearby(location) {
            const data = {
                latitude: location.lat,
                longitude: location.lng,
            };
            const response = await nearbyWalks(data);
            return response.data;
        },
        async showHotplace() {
            const response = await nearbyHotplace(this.curLocation);
            const hotspots = response.data;
            console.log(hotspots);
            if (hotspots.length === 0) {
                return;
            }
            hotspots.forEach((spot) => {
                const marker = createMarker([spot.lat, spot.lng], markerImages.hotPlace(), this.map);
                this.hotspotMarkers.push(marker);
            });
        },
        deleteMarker() {
            if (this.hotspotMarkers) {
                this.hotspotMarkers.forEach((marker) => marker.setMap(null));
            }
            this.hotspotMarkers = [];
        },
    },
    beforeDestroy() {
        this.deleteMarker();
    },
};
</script>

<style scoped>
#map {
    width: 100%;
    height: 100%;
}
</style>

<template>
    <div class="board">
        <div class="loginpage">
            <div class="logo">
                <img src="~@/assets/login/logo.png" />
                <p>간편하게게 소셜로그인하고 <br />산책가까 서비스를 이용해보세요</p>
            </div>
            <div class="socialLogin">
                <a
                    href="http://localhost:8080/oauth2/authorization/google?redirect_uri=http://localhost:3000/oauth2/redirect"
                >
                    <img src="~@/assets/login/google.png" />
                </a>
                <a
                    href="http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect"
                >
                    <img src="~@/assets/login/kakao.png" />
                </a>
                <a
                    href="http://localhost:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth2/redirect"
                >
                    <img src="~@/assets/login/naver.png" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
export default {};
</script>

<style scoped>
.board {
    width: 100%;
    height: 100%;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
}
.logo {
    justify-content: center;
    align-items: center;
    width: 60%;
    margin: 0 auto;
}
.logo img {
    width: 100%;
}
.logo p {
    margin-top: 10%;
    text-align: center;
    color: #777;
}
.socialLogin {
    padding: 5% 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}
.socialLogin a {
    width: 20%;
}
.socialLogin img {
    width: 100%;
}
</style>

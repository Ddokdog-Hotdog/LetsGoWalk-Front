<template>
    <div class="post-input-compo">
        <div class="post-input-compo-text-input">
            <input type="text" placeholder="제목을 입력해주세요.">
        </div>
        <div class="post-input-img">
            <div>
                <!-- 파일 추가 시마다 이미지 미리보기 -->
                <input type="file" id="upload-image" hidden multiple @change="addFiles" accept="image/*"/>
                <label for="upload-image">
                    <img src="@/assets/writePostCompo/AddImage.png" />
                </label>
            </div>
            <!-- 이미지 미리보기 리스트 -->
            <div class="post-images-preview">
                <div class="uploaded-image" v-for="(src, index) in imageSrcs" :key="index">
                    <img :src="src" class="preview-image">
                    <img :src="deleteBtnSrc" alt="Delete" class="delete-icon" @click="removeImage(index)">
                </div>
            </div>
        </div>

        <div class="post-input-compo-text-textarea">
            <textarea placeholder="내용을 입력해주세요."/>
        </div>
        
        
    </div>
</template>

<script>
export default {
    data() {
        return {
        imageSrcs: [],  // 이미지 URL을 저장할 배열
        deleteBtnSrc: require("@/assets/writePostCompo/deleteBtn.png")
        };
    },
    methods: {
        addFiles(event) {
        const files = Array.from(event.target.files);
        // 새로 추가된 파일을 기존 파일에 추가하되 최대 5개를 유지
        files.forEach(file => {
            if (this.imageSrcs.length < 5 && file.type.startsWith('image/')) {
            this.readFile(file);
            }
        });
        },
        readFile(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // 이미지 데이터 URL을 배열에 추가
                this.imageSrcs.push(e.target.result);
            };
            reader.readAsDataURL(file);
        },
        removeImage(index) {
            this.imageSrcs.splice(index, 1);
        }
    }
}
</script>

<style scoped>
.post-input-compo {
    display: block;
}
.post-input-compo-text-input input{
    width: 100%;
    border: 1px solid #E9E9E9;
    padding:  0 0 0 10px;
    border-radius: 10px;
    height: 40px;
}
.post-input-img{
    display: flex;
}
.post-input-compo-text-textarea{
    height: 100%;
}
.post-input-compo-text-textarea textarea {
    width: 100%;
    border: 1px solid #E9E9E9;
    border-radius: 10px;
    resize: none;
    padding: 10px;
}
.uploaded-image{
    width: 80px;
    height: 80px;
    object-fit: cover;
    margin: 17px 5px 10px 5px;
    border-radius: 10px;
}
.post-images-preview{
    display: flex;
    overflow-x: auto ;
    
}
label {
    text-align: left;
}
label img {
    border: 1px solid #E9E9E9;
    padding: 30px;
    margin: 17px 0 10px 0;
    width: 80px;
    height: 80px;
    border-radius: 10px;
}
.delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;
    cursor: pointer;
}
.preview-image{
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 10px;
}
.delete-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 14px;
    height: 14px;
    cursor: pointer;
}
.uploaded-image{
    position: relative;
}
</style>
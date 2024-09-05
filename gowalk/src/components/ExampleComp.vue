import axios from '../axios'; // 설정된 axios import

export default {
  methods: {
    fetchData() {
      axios.get('/api/protected-resource')
        .then(response => {
          console.log(response.data);
        })
        .catch(error => {
          console.error('API 요청 실패:', error);
        });
    }
  }
};

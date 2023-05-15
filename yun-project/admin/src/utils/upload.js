//上传表单信息功能的封装
import axios from "axios";
function upload(path, userForm) {
  // FormData()构造函数处理表单数据，然后 params.append()方法处理成后端可以收到的参数
  const params = new FormData(); //因为我们对对象中含有文件类型的file，所以我们处理一下
  for (let i in userForm) {
    params.append(i, userForm[i]);
  }
  return axios.post(path, params, {
    //post文件类型注意要声明请求头
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export default upload;

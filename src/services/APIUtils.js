import _ from "lodash";
import { BASE_URL } from "./Constants";

const APIUtils = {
  // create: () => {
  //   return _.clone(this);
  // },
  // postData: (url, inputData, onSuccess, onFailure) => {
  //   try {
  //     fetch(BASE_URL.concat(url), {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(inputData ?? {}),
  //     })
  //       .then((res) => {
  //         res.headers.forEach((x) => console.log(x));
  //         return res.json();
  //       })
  //       .then((data) => {
  //         if (data && data.status === "success") {
  //           onSuccess && onSuccess(data.data);
  //           return;
  //         }
  //         if (data && data.status === "error") {
  //           onFailure && onFailure(data.message);
  //           return;
  //         }
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //         onFailure && onFailure(error);
  //       });
  //   } catch (error) {
  //     onFailure && onFailure(error);
  //     console.log("In catch");
  //     console.log(error);
  //   }
  // },

  // postFormData: (url, inputData, onSuccess, onFailure) => {
  //   try {
  //     fetch(BASE_URL.concat(url), {
  //       method: "POST",
  //       body: inputData,
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data && data.status === "success") {
  //           onSuccess && onSuccess(data.data);
  //           return;
  //         }
  //         if (data && data.status === "error") {
  //           onFailure && onFailure(data.message);
  //           return;
  //         }
  //       })
  //       .catch((error) => {
  //         if (error) onFailure && onFailure(error);
  //       });
  //   } catch (error) {
  //     if (error) {
  //       onFailure && onFailure(error);
  //       console.log("In catch");
  //       console.log(error);
  //     }
  //   }
  // },

  // getData: (url, onSuccess, onFailure) => {
  //   try {
  //     fetch(BASE_URL.concat(url), {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       //body: JSON.stringify(inputData ?? {}),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data && data.status === "success") {
  //           onSuccess && onSuccess(data.data);
  //           return;
  //         }
  //         if (data && data.status === "error") {
  //           onFailure && onFailure(data.message);
  //           return;
  //         }
  //       })
  //       .catch((error) => {
  //         if (error) onFailure && onFailure(error);
  //       });
  //   } catch (error) {
  //     if (error) {
  //       onFailure && onFailure(error);
  //       console.log("In catch");
  //       console.log(error);
  //     }
  //   }
  // },

  // getExternalData: (url, onSuccess, onFailure) => {
  //   try {
  //     fetch(url, {
  //       method: "GET",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json; charset=utf-8",
  //         "Access-Control-Allow-Headers": "Authorization, Content-Type",
  //         "Access-Control-Allow-Origin": "*",
  //       },
  //       mode: "cors",
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data && data.status === "success") {
  //           onSuccess && onSuccess(data.data);
  //           return;
  //         }
  //         if (data && data.status === "error") {
  //           onFailure && onFailure(data.message);
  //           return;
  //         }
  //       })
  //       .catch((error) => {
  //         if (error) onFailure && onFailure(error);
  //       });
  //   } catch (error) {
  //     if (error) {
  //       onFailure && onFailure(error);
  //       console.log("In catch");
  //       console.log(error);
  //     }
  //   }
  // },
};

export default APIUtils;

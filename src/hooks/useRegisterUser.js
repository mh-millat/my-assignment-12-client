// import { useMutation } from "@tanstack/react-query";
// import axiosSecure from "../api/axiosSecure";
// import { toast } from "react-hot-toast";

// const useRegisterUser = () => {
//     return useMutation({
//         mutationFn: user => axiosSecure.post("/users", user),
//         onSuccess: () => toast.success("User saved to DB"),
//         onError: () => toast.error("Failed to save user to DB"),
//     });
// };

// export default useRegisterUser;
import { useMutation } from "@tanstack/react-query";
import axiosSecure from "../api/axiosSecure";
import { toast } from "react-hot-toast";

const useRegisterUser = () => {
  return useMutation({
    mutationFn: (user) => axiosSecure.post("/users", user),
    onSuccess: () => toast.success("User saved to DB"),
    onError: () => toast.error("Failed to save user to DB"),
  });
};

export default useRegisterUser;

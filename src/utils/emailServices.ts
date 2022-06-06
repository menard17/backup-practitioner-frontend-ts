import axios from "axios";

interface EmailObject {
  email: string;
  familyName: string;
  type: string;
}

const sendEmail = async (payload: EmailObject) => {
  const response = await axios.post(
    process.env.VUE_APP_logic_app_url,
    payload,
    {
      withCredentials: false,
    }
  );
  console.log(response);
  return response;
};

export default sendEmail;

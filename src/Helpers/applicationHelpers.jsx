import axios from "axios";
import { API_URL } from "../constants";

export const fetchAccounts = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get(`${API_URL}/getUserAccounts`, config);
      if(response.status===200){
        return response.data
      }else{
        throw error;
      }
    } catch (error) {
      console.error("Error fetching accounts", error);
    }
};

export const fetchTransactions = async(token) =>{
  try {
    const config = { headers: { Authorization: `Bearer ${token}` } };
    const response = await axios.get(`${API_URL}/getUserTransaction`, config);
    if(response.status===200){
      return response.data
    }else{
      throw error;
    }
  } catch (error) {
    console.error("Error fetching accounts", error);
  }
}
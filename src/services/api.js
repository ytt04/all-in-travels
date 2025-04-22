import axios from "axios";

const API = axios.create({
  baseURL: "https://api.test.interactiva.net.co/api/",
});

export const getTravels = () => API.get("get-travels/");
export const getCompanies = () => API.get("get-companies/");
export const getPartners = () => API.get("get-partners/");
export const getBanners = () => API.get("get-banners/");
export const getCategories = () => API.get("get-categories/");
export const getBlogs = () => API.get("get-blogs/");
export const getCustomerExperiences = () => API.get("get-customer_experiences/");
export const getTags = () => API.get("get-tags/");

export const postQuotation = (data) => API.post("set-quotations/", data);
export const postNewsletter = (data) => API.post("set-newsletter/", data);

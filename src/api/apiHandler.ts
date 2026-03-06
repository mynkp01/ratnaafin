import Query from "./Query";
import { adminApiClient, apiClient } from "./apiClient";

export const apiHandler = {
  job: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.job}-lookup?${filterString}`);
    },
    cityLookup: (filterString = "") => {
      return apiClient.get(`${Query.job}-city-lookup?${filterString}`);
    },
    stateLookup: (filterString = "") => {
      return apiClient.get(`${Query.job}-state-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.job}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.job}/${id}`);
    },
    delete: (id: string) => {
      return adminApiClient.delete(`${Query.job}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.job, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.job}/${id}`, payload);
    },
    updateStatus: (id: string) => {
      return adminApiClient.patch(`${Query.job}-update-status/${id}`);
    },
  },
  ApplyForJob: {
    post: (payload: unknown) => {
      return apiClient.post(Query.applyForJob, payload);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.applyForJob}?${filterString}`);
    },
    excel: (filterString = "") => {
      return adminApiClient.get(`${Query.applyForJob}-excel?${filterString}`);
    },
  },

  values: {
    list(filterString = "") {
      return adminApiClient.get(`${Query.lookupValue}?${filterString}`);
    },
    get(id: string) {
      return adminApiClient.get(`${Query.lookupValue}/${id}`);
    },
    post(payload: unknown) {
      return adminApiClient.post(Query.lookupValue, payload);
    },
    patch(id: string, payload: unknown) {
      return adminApiClient.patch(`${Query.lookupValue}/${id}`, payload);
    },
    delete(id: string) {
      return adminApiClient.delete(`${Query.lookupValue}/${id}`);
    },
    lookup(filterString = "") {
      return adminApiClient.get(`${Query.valueLookup}?${filterString}`);
    },
    parentCategory(filterString = "") {
      return adminApiClient.get(`${Query.lookupValue}-parent-category?${filterString}`);
    },
  },
  category: {
    list(filterString = "") {
      return adminApiClient.get(`${Query.lookupCategory}?${filterString}`);
    },
    get(id: string) {
      return adminApiClient.get(`${Query.lookupCategory}/${id}`);
    },
    post(payload: unknown) {
      return adminApiClient.post(Query.lookupCategory, payload);
    },
    patch(id: string, payload: unknown) {
      return adminApiClient.patch(`${Query.lookupCategory}/${id}`, payload);
    },
    delete(id: string) {
      return adminApiClient.delete(`${Query.lookupCategory}/${id}`);
    },
    adminCategoryLookup(filterString = "") {
      return adminApiClient.get(`${Query.adminCategoryLookup}?${filterString}`);
    },
  },
  city: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.city}-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.city}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.city}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.city, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.city}/${id}`, payload);
    },
    parentCategory: (filterString = "") => {
      return adminApiClient.get(`${Query.city}?${filterString}`);
    },
  },
  state: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.state}-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.state}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.state}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.state, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.state}/${id}`, payload);
    },
  },
  country: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.country}-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.country}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.country}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.country, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.country}/${id}`, payload);
    },
  },
  branchLocator: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.branchLocator}-lookup?${filterString}`);
    },
    stateLookup: (filterString = "") => {
      return apiClient.get(`${Query.branchLocator}-state-lookup?${filterString}`);
    },
    cityLookup: (filterString = "") => {
      return apiClient.get(`${Query.branchLocator}-city-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.branchLocator}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.branchLocator}/${id}`);
    },
    delete: (id: string) => {
      return adminApiClient.delete(`${Query.branchLocator}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.branchLocator, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.branchLocator}/${id}`, payload);
    },
  },
  blog: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.blog}-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.blog}-list?${filterString}`);
    },
    getByUrl: (filterString = "") => {
      return apiClient.get(`${Query.blog}-by-url?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.blog}/${id}`);
    },
    delete: (id: string) => {
      return adminApiClient.delete(`${Query.blog}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.blog, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.blog}/${id}`, payload);
    },
    updateStatus: (id: string) => {
      return adminApiClient.patch(`${Query.blog}-status/${id}`);
    },
    blogContentUpload: (payload: unknown) => {
      return adminApiClient.post(Query.blogContentUpload, payload);
    },
    deleteBlogContent: (payload: unknown) => {
      return adminApiClient.delete(`${Query.blogContentUpload}`, payload);
    },
  },

  value: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.valueLookup}?${filterString}`);
    },
  },
  disclosure: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.disclosure}-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.disclosure}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.disclosure}/${id}`);
    },
    delete: (id: string) => {
      return adminApiClient.delete(`${Query.disclosure}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.disclosure, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.disclosure}/${id}`, payload);
    },
  },
  admin: {
    signIn: (payload: unknown) => {
      return adminApiClient.post(`${Query.admin}-sign-in`, payload);
    },
    signOut: () => {
      return adminApiClient.post(`${Query.admin}-sign-out`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.admin}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.admin}/${id}`);
    },
    delete: (id: string) => {
      return adminApiClient.delete(`${Query.admin}/${id}`);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.admin}/${id}`, payload);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.admin, payload);
    },
  },
  youtube: {
    lookup: (filterString = "") => {
      return apiClient.get(`${Query.youtube}-lookup?${filterString}`);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.youtube}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.youtube}/${id}`);
    },
    delete: (id: string) => {
      return adminApiClient.delete(`${Query.youtube}/${id}`);
    },
    post: (payload: unknown) => {
      return adminApiClient.post(Query.youtube, payload);
    },
    patch: (id: string, payload: unknown) => {
      return adminApiClient.patch(`${Query.youtube}/${id}`, payload);
    },
  },
  wpForm: {
    contactUs: (payload: unknown) => {
      return apiClient.post(Query.contactUsCrm, payload);
    },
    contactUsList: (filterString = "") => {
      return adminApiClient.get(`${Query.contactUsCrm}?${filterString}`);
    },
    contactUsGet: (id: string) => {
      return adminApiClient.get(`${Query.contactUsCrm}/${id}`);
    },
    contactUsExcel: (filterString = "") => {
      return adminApiClient.get(`${Query.contactUsCrm}-excel?${filterString}`);
    },
    requestCall: (payload: unknown) => {
      return apiClient.post(Query.requestACallCrm, payload);
    },
    requestCallList: (filterString = "") => {
      return adminApiClient.get(`${Query.requestACallCrm}?${filterString}`);
    },
    requestCallGet: (id: string) => {
      return adminApiClient.get(`${Query.requestACallCrm}/${id}`);
    },
    requestCallExcel: (filterString = "") => {
      return adminApiClient.get(`${Query.requestACallCrm}-excel?${filterString}`);
    },
    applyForLoan: (payload: unknown) => {
      return apiClient.post(Query.applyForLoanCrm, payload);
    },
    applyForLoanList: (filterString = "") => {
      return adminApiClient.get(`${Query.applyForLoanCrm}?${filterString}`);
    },
    applyForLoanGet: (id: string) => {
      return adminApiClient.get(`${Query.applyForLoanCrm}/${id}`);
    },
    applyForLoanExcel: (filterString = "") => {
      return adminApiClient.get(`${Query.applyForLoanCrm}-excel?${filterString}`);
    },
  },
  nach: {
    post: (payload: unknown) => {
      return apiClient.post(Query.nach, payload);
    },
    list: (filterString = "") => {
      return adminApiClient.get(`${Query.nach}?${filterString}`);
    },
    get: (id: string) => {
      return adminApiClient.get(`${Query.nach}/${id}`);
    },
  },
};

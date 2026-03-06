import { API_V1 } from "@/utils/Constant";

enum Query {
  job = `${API_V1}/job`,
  applyForJob = `${API_V1}/apply-for-job`,

  valueLookup = `${API_V1}/value-lookup`,

  city = `${API_V1}/city`,
  state = `${API_V1}/state`,
  country = `${API_V1}/country`,
  youtube = `${API_V1}/youtube`,
  blog = `${API_V1}/blog`,
  branchLocator = `${API_V1}/branch-locator`,
  disclosure = `${API_V1}/disclosure`,
  admin = `${API_V1}/admin`,
  adminSignIn = `${API_V1}/admin-sign-in`,
  contactUsCrm = `${API_V1}/contact-us-crm`,
  requestACallCrm = `${API_V1}/request-a-call-crm`,
  applyForLoanCrm = `${API_V1}/apply-for-loan-crm`,
  lookupCategory = `${API_V1}/lookup-category`,
  adminCategoryLookup = `${API_V1}/admin-lookup-category`,
  lookupValue = `${API_V1}/lookup-value`,
  nach = `${API_V1}/nach`,
  blogContentUpload = `${API_V1}/blog-content-upload`,
}

export default Query;

import { axiosBase } from "../slices/apiSlice";

export const endpoint = "transactions";

export const getById = async (id) => {
  const response = await axiosBase.get(`${endpoint}/${id}`);
  return response.data;
};

export const searchMany = async (query) => {
  const response = await axiosBase.post(`${endpoint}/search-many`, query).then((res) => res.data);

  return response;
};

export const searchFirst = async (query) => {
  const response = await axiosBase.post(`${endpoint}/search-first`, query);
  return response.data;
};

export const eDispatchFindOrCreateByQrcode = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-find-create-qrcode`, data).then((res) => res.data);

  return response;
};

export const eDispatchPksWbInNormalAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-pks-wbin-normal-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchPksWbOutNormalAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-pks-wbout-normal-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchPksWbInCancelAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-pks-wbin-cancel-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchPksWbOutCancelAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-pks-wbout-cancel-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchPksWbInRejectT300After = async (data) => {
  const response = await axiosBase
    .post(`${endpoint}/edispatch-pks-wbin-reject-t300-after`, data)
    .then((res) => res.data);

  return response;
};

export const eDispatchPksWbInRejectBulkingAfter = async (data) => {
  const response = await axiosBase
    .post(`${endpoint}/edispatch-pks-wbin-reject-bulking-after`, data)
    .then((res) => res.data);

  return response;
};

export const eDispatchPksWbOutRejectAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-pks-wbout-reject-after`, data).then((res) => res.data);

  return response;
};

// ============================================================

export const eDispatchT30WbInNormalAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-t30-wbin-normal-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchT30WbOutNormalAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-t30-wbout-normal-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchT30WbInCancelAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-t30-wbin-cancel-after`, data).then((res) => res.data);

  return response;
};

export const eDispatchT30WbOutCancelAfter = async (data) => {
  const response = await axiosBase.post(`${endpoint}/edispatch-t30-wbout-cancel-after`, data).then((res) => res.data);

  return response;
};

// ============================================================

export const eDispatchBulkingWbInNormalAfter = async (data) => {
  const response = await axiosBase
    .post(`${endpoint}/edispatch-bulking-wbin-normal-after`, data)
    .then((res) => res.data);

  return response;
};

export const eDispatchBulkingWbOutNormalAfter = async (data) => {
  const response = await axiosBase
    .post(`${endpoint}/edispatch-bulking-wbout-normal-after`, data)
    .then((res) => res.data);

  return response;
};

export const eDispatchBulkingWbOutRejectAfter = async (data) => {
  const response = await axiosBase
    .post(`${endpoint}/edispatch-bulking-wbout-reject-after`, data)
    .then((res) => res.data);

  return response;
};

// ============================================================

export const searchByQR = async (query) => {
  const response = await axiosBase.post(`${endpoint}/search-qr`, query);
  return response.data;
};

export const getByPlateNo = async (query) => {
  const response = await axiosBase.get(`${endpoint}/getByPlateNo`, {
    params: { ...query },
  });
  return response.data;
};

export const create = async (data) => {
  const response = await axiosBase.post(`${endpoint}`, data);

  return response.data;
};

export const update = async (data) => {
  const response = await axiosBase.patch(`${endpoint}/${data?.id}`, data);
  return response.data;
};

export const deleteById = async (id) => {
  const response = await axiosBase.delete(`${endpoint}/${id}`);
  return response.data;
};

export const InitialData = {
  id: "",
  typeTransaction: 0,
  typeSite: 0,

  bonTripNo: "",
  vehicleStatus: 0,
  deliveryStatus: 0,
  progressStatus: 0,

  deliveryOrderId: "",
  deliveryOrderNo: "",
  deliveryDate: null,

  productId: "",
  productCode: "",
  productName: "",

  rspoSccModel: 0,
  rspoUniqueNumber: "",
  isccSccModel: 0,
  isccUniqueNumber: "",
  isccGhgValue: 0,
  isccEeeValue: 0,

  transporterId: "",
  transporterCompanyCode: "",
  transporterCompanyName: "",
  transporterCompanyShortName: "",

  driverId: "",
  driverNik: "",
  driverName: "",
  driverLicenseNo: "",

  transportVehicleId: "",
  transportVehiclePlateNo: "",
  transportVehicleProductCode: "",
  transportVehicleProductName: "",
  transportVehicleSccModel: 0,

  originSiteId: "",
  originSiteCode: "",
  originSiteName: "",

  originSourceStorageTankId: "",
  originSourceStorageTankCode: "",
  originSourceStorageTankName: "",

  destinationSiteId: "",
  destinationSiteCode: "",
  destinationSiteName: "",

  destinationSinkStorageTankId: "",
  destinationSinkStorageTankCode: "",
  destinationSinkStorageTankName: "",

  originFfaPercentage: 0,
  originMoistPercentage: 0,
  originDirtPercentage: 0,

  originWeighInKg: 0,
  originWeighInRemark: "",
  originWeighInOperatorName: "",
  originWeighInTimestamp: null,

  originWeighOutKg: 0,
  originWeighOutRemark: "",
  originWeighOutOperatorName: "",
  originWeighOutTimestamp: null,

  potonganWajib: 0,
  potonganLain: 0,

  destinationWeighInKg: 0,
  destinationWeighInRemark: "",
  destinationWeighInOperatorName: "",
  destinationWeighInTimestamp: null,

  destinationWeighOutKg: 0,
  destinationWeighOutRemark: "",
  destinationWeighOutOperatorName: "",
  destinationWeighOutTimestamp: null,

  returnWeighInKg: 0,
  returnWeighInRemark: "",
  returnWeighInOperatorName: "",
  returnWeighInTimestamp: null,

  returnWeighOutKg: 0,
  returnWeighOutRemark: "",
  returnWeighOutOperatorName: "",
  returnWeighOutTimestamp: null,

  currentSeal1: "",
  currentSeal2: "",
  currentSeal3: "",
  currentSeal4: "",

  jsonData: {
    formatIdentifier: "",
    formatVersion: 0,
    functionCode: 0,
    applicationId: 0,
    applicationVersion: "",
    deviceId: "",
    transporterCompanyCode: "",
    transporterCompanyShortName: "",
    transporterCompanyFullName: "",
    driverCitizenNo: "",
    driverFullName: "",
    vehiclePlateNo: "",
    vehicleProductCode: "",
    vehicleProductName: "",
    vehicleAllowableSccModel: 0,
    drivingLicenceNo: "",
    vehicleOperationStatus: 0,
    currentSeal1: "",
    currentSeal2: "",
    currentSeal3: "",
    currentSeal4: "",
    deliveryOrderId: "",
    deliveryOrderNo: "",
    deliveryDate: "",
    productCode: "",
    productName: "",
    originSiteCode: "",
    originSiteName: "",
    originSourceTankCode: "",
    originSourceTankName: "",
    destinationSiteCode: "",
    destinationSiteName: "",
    destinationSinkTankCode: "",
    destinationSinkTankName: "",
    rspoSccModel: 0,
    rspoUniqueNumber: "",
    isccSccModel: 0,
    isccUniqueNumber: "",
    isccGhgValue: 0,
    isccEeeValue: 0,
    deliveryStatus: 0,
    originFfaPercentage: 0,
    originMoistPercentage: 0,
    originDirtPercentage: 0,
    originWeighInTimestamp: "",
    originWeighInOperatorName: "",
    originWeighInKg: 0,
    originWeighInRemark: "",
    originWeighOutTimestamp: "",
    originWeighOutOperatorName: "",
    originWeighOutKg: 0,
    originWeighOutRemark: "",
    originNettoKg: 0,
    destinationWeighInTimestamp: "",
    destinationWeighInOperatorName: "",
    destinationWeighInKg: 0,
    destinationWeighInRemark: "",
    destinationWeighOutTimestamp: "",
    destinationWeighOutOperatorName: "",
    destinationWeighOutKg: 0,
    destinationWeighOutRemark: "",
    destinationNettoKg: 0,
    returnWeighInTimestamp: "",
    returnWeighInOperatorName: "",
    returnWeighInKg: 0,
    returnWeighInRemark: "",
    returnWeighOutTimestamp: "",
    returnWeighOutOperatorName: "",
    returnWeighOutKg: 0,
    returnWeighOutRemark: "",
    returnNettoKg: 0,
    loadingTimestamp: "",
    loadingOperatorName: "",
    loadedSeal1: "",
    loadedSeal2: "",
    loadedSeal3: "",
    loadedSeal4: "",
    loadingRemark: "",
    unloadingTimestamp: "",
    unloadingOperatorName: "",
    unloadedSeal1: "",
    unloadedSeal2: "",
    unloadedSeal3: "",
    unloadedSeal4: "",
    unloadingRemark: "",
    returnUnloadingTimestamp: "",
    returnUnloadingOperatorName: "",
    returnUnloadedSeal1: "",
    returnUnloadedSeal2: "",
    returnUnloadedSeal3: "",
    returnUnloadedSeal4: "",
    returnUnloadingRemark: "",
    externalRefNo: "",
    externalRefNo2: "",
  },
};

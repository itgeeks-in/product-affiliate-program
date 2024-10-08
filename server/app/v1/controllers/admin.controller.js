const service = require('../services/admin.service')
const { sendResponse } = require("../utils/sendResponse.js");
const { SuccessMessage, ErrorMessage } = require("../constants/messages.js");
const statusCode = require("../constants/statusCodes.js");

exports.allUsers = async (req, res) => {
    console.info('********************************all Users API**********************');
    try {

        const result = await service.allUsers(req)

        if (result.status) {
            return sendResponse(res, statusCode.OK, true, SuccessMessage.FETCH, result)
        }
        else if (result.status == false && !result.result) {
            sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)
        }
        else if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR)
        }

    } catch (error) {
        console.error('Error in all users api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
}

exports.notAssignedCustomers = async (req, res) => {
    try {
        const affiliateId = req.params.id
        const result = await service.notAssignedCustomers(affiliateId, req);
        if (result.status && result.result) {
            return sendResponse(res, statusCode.OK, true, SuccessMessage.FETCH, result)
        }
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, result.result);
        }

    } catch (error) {
        console.error("Error in notAssignedCustomers : ", error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
}

exports.affiliateListAssign = async (req, res) => {
    try {
        const afiliateId = req.params.id
        const users = await service.affiliateListAssign(afiliateId, req);
        if (users.status == false && users.status) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

        }
        if (users.status == false && !users.result) {
            return sendResponse(res, statusCode.NOT_FOUND, true, ErrorMessage.NOT_FOUND)
        }
        if (users.status && users.result) {
            return sendResponse(res, statusCode.OK, true, SuccessMessage.FETCH, users?.result)
        }


    } catch (error) {
        console.error("Error in affiliateListAssign api : ", error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
}

exports.userAffiliates = async (req, res) => {
    try {
        const userId = req.params.id
        const result = await service.userAffiliates(userId, req);
        if (result.status && result.result) {
            return sendResponse(res, statusCode.OK, true, SuccessMessage.FETCH, result)
        }
        if (result.status == false && !result.result) {
            return sendResponse(res, statusCode.NOT_FOUND, false, ErrorMessage.NOT_FOUND, result)
        }
        if (result.status == false && result.result) {
            return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, result);

        }


    } catch (error) {
        console.error('Error in user affiliate  api : ', error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);
    }
}

//delete affiliate
exports.deleteAffiliate = async (req, res) => {
    try {

        const affiliateId = req.params.id
        const result = await service.deleteAffiliate(affiliateId, req);
        console.log(result.isExist)
        if (result.status == false && result.isExist == false) {
            return sendResponse(res, statusCode.NOT_FOUND, false, `Affiliate ${ErrorMessage.NOT_FOUND}`);
        }
        if (result.status == false) {
            return sendResponse(res, statusCode.BAD_REQUEST, false, `Affiliate ${ErrorMessage.NOT_CREATED}`);
        }
        return sendResponse(res, statusCode.OK, true, `Affiliate ${SuccessMessage.DELETE}`);


    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }

}

//userDetails
exports.userDetails = async (req, res) => {
    try {
        const userId = req.params.id
        const result = await service.userDetails(userId)
        return sendResponse(res, statusCode.OK, true, `User Details ${SuccessMessage.FETCH}`, result)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//delete affilaite assign
exports.deleteAffiliateAssign = async (req, res) => {
    try {
        const affiliateId = req.params.id

        const result = await service.deleteAffiliateAssign(affiliateId)
        if (result) {
            return sendResponse(res, statusCode.OK, true, `Assigne  ${SuccessMessage.DELETE}`)
        }
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//update user status 
exports.updateUserStatus = async (req, res) => {
    try {
        const userId = req.params.id
        const status = req.body.status
        const result = await service.updateUserStatus(userId, status)
        if (result.status) {
            return sendResponse(res, statusCode.OK, true, `User${SuccessMessage.UPDATE}`)
        }
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//update user commission
exports.updateCommission = async (req, res) => {
    try {
        const userId = req.params.id
        const commission = req.body.commission
        const result = await service.updateCommission(userId, commission)
        if (result.status) {
            return sendResponse(res, statusCode.OK, true, `User${SuccessMessage.UPDATE}`)
        }
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}
//update afffilite type
exports.updateAffiliateType = async (req, res) => {
    try {
        const affiliateId = req.params.id
        const details = req.body.details
        const result = await service.updateAffiliateType(affiliateId,details)
        if (result.status) {
            return sendResponse(res, statusCode.OK, true, `Assign Affiliate ${SuccessMessage.UPDATE}`)
        }
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//bulk delete affilaite assign
exports.bulkDeleteAffiliateAssign = async (req, res) => {
    try {
        const affiliateIds = req.body.details
        const result = await service.bulkDeleteAffiliateAssign(affiliateIds)
        if (result) {
            return sendResponse(res, statusCode.OK, true, `Assigne Affiliate ${SuccessMessage.DELETE}`)
        }
        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}

//get all assigned users of a affiliate
exports.assignedUsers = async (req, res) => {
    try {
        const affiliateId = req.params.id

        const result = await service.assignedUsers(affiliateId,req)
        if (result.status && result.result) {
            return sendResponse(res, statusCode.OK, true, `Data ${SuccessMessage.FETCH}`, result.result)
        }

        return sendResponse(res, statusCode.BAD_REQUEST, false, ErrorMessage.BAD_REQUEST)

    } catch (error) {
        console.error(error);
        return sendResponse(res, statusCode.INTERNAL_SERVER_ERROR, false, ErrorMessage.INTERNAL_SERVER_ERROR, error?.errors);

    }
}
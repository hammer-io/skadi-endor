import express from 'express';
import authentication from '../utils/authentication';
import * as controller from '../controllers/tokens.controller';
import * as middleware from '../middlewares/tokens.middleware';

export const router = express.Router();

// Add short delay to prevent brute-force attacks
router.use((req, res, next) => {
  const delayMillis = 1000;
  setTimeout(next, delayMillis);
});

/**
 * @api {post} /tokens Create API Token
 * @apiVersion 1.0.0
 * @apiName Post Token
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 *
 * @apiParam {String} projectId The id of the project to create the token for
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "projectId": "8b004799-23ff-4f23-9567-c64112caf9e9"
 * }
 *
 * @apiSuccess {Object} token an object with the token information such as id, token, projectId,
 * and created/updated dates
 *
 * @apiSuccessExample {json} Success Response
 * {
    "token": {
        "id": "8b004799-23ff-4f23-9567-c64112caf9e9",
        "token": "57045c56-1bd4-435b-9a9a-e03a906fa723",
        "projectId": "a3",
        "updatedAt": "2018-02-21T00:31:12.293Z",
        "createdAt": "2018-02-21T00:31:12.293Z"
    }
  }
 */
router.post(
  '/tokens',
  authentication.endorAuthenticate,
  middleware.checkCreateNewToken(),
  controller.generateNewToken
);

/**
 * @api {get} /tokens Get Token
 * @apiVersion 1.0.0
 * @apiName Get Token
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 *
 * @apiParam {String} tokenOrProjectId the project id or token id (note API token, but they token id
 * itself) to to get
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "tokenOrProjectId": "8b004799-23ff-4f23-9567-c64112caf9e9"
 * }
 *
 * @apiSuccess {Object} token an object with the token information such as id, token, projectId,
 * and created/updated dates
 *
 * @apiSuccessExample {json} Success Response
 * {
    "token": {
        "id": "8b004799-23ff-4f23-9567-c64112caf9e9",
        "token": "57045c56-1bd4-435b-9a9a-e03a906fa723",
        "projectId": "a3",
        "updatedAt": "2018-02-21T00:31:12.293Z",
        "createdAt": "2018-02-21T00:31:12.293Z"
    }
  }
 */
router.get(
  '/tokens/:tokenOrProjectId',
  authentication.endorAuthenticate,
  controller.getToken
);

/**
 * @api {delete} /tokens/:tokenId Delete Token
 * @apiVersion 1.0.0
 * @apiName Delete Token
 * @apiGroup Tokens
 *
 * @apiPermission Endor only (Authorization: "Bearer <token>")
 *
 * @apiParam {String} tokenOrProjectId the project id or token id (note API token, but they
 * token id itself) to to delete
 *
 * @apiParamExample {json} Request Example:
 * {
 *  "tokenOrProjectId": "57045c56-1bd4-435b-9a9a-e03a906fa723"
 * }
 *
 */
router.delete(
  '/tokens/:tokenOrProjectId',
  authentication.endorAuthenticate,
  controller.deleteToken
);

export function setDependencies(tokensService) {
  controller.setDependencies(tokensService);
}

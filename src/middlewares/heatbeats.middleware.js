/* eslint-disable import/prefer-default-export */
import { check } from 'express-validator/check';

export function checkPostNewHeartbeats() {
  return [
    check('id').exists().withMessage('id field is required.')
  ];
}
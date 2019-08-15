import React, { useState, useEffect } from 'react';
import ReviewForm from './ReviewForm';
import axios from 'axios';
import './css/WriteReview.css';
// https://www.goodreads.com/review.xml
export const WriteReview = props => {
  return ReviewForm(props);
};

export default WriteReview;

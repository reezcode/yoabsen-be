import client from "../../database/client";
import express from 'express';

const upload = async (file: any) => {
  const fileName = `${Date.now()}-${file.originalname}`;
    const { data, error } = await client.storage
      .from('assets') 
      .upload(fileName, file.buffer, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.mimetype,
      });
    if (error) {
      throw error;
    }
    return data;
  };

  export {upload}
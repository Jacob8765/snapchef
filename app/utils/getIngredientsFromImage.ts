import {useContext, useEffect, useState} from 'react';
import type {Recipe} from '../types/Recipe';
import {Ingredient} from '../types/Ingredient';

export async function getIngredientsFromImage(filePath: string) {
  try {
    const formData = new FormData();
    formData.append('picture', {
      uri: filePath,
      type: 'image/jpeg',
      name: 'photo.jpg',
    });

    const res = await fetch('http://10.0.4.83:8000/identify_ingredients', {
      method: 'POST',
      body: formData,
      headers: {
        Accept: '*/*',
        'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
      },
    });

    console.log('RES', res);
    const data = (await res.json()) as Ingredient[];
    console.log('DATA', data);
    return data;
  } catch (e) {
    throw e;
  }
}

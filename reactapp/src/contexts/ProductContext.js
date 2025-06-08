import React, { createContext, useContext, useState } from 'react';

// Import product images
import sawitproFertilizer50kgPlus40kgBunchAshImage from '../images/products/SawitPRO_Fertilizer_50kg_+_40kg_Bunch_Ash.avif';
import siBrondolSawitproTshirtSizeXlImage from '../images/products/Si_Brondol_SawitPRO_T-shirt_size_XL.avif';
import furadan3gr2kgImage from '../images/products/Furadan_3GR_2Kg.avif';
import garlon670Ec1LiterImage from '../images/products/Garlon_670_EC_1Liter.avif';
import garlon670Ec100mlImage from '../images/products/Garlon_670_EC_100ml.avif';
import bombUp520Sl20LitersImage from '../images/products/Bomb_Up_520_SL_20Liters.avif';
import bombUp520Sl5LiterImage from '../images/products/Bomb_Up_520_SL_5Liters.avif';
import post480Sl1LiterImage from '../images/products/Post_480_SL_1Liter.avif';
import pillarUp480Sl20LiterImage from '../images/products/Pillar_Up_480_SL_20Liter.avif';
import pillarUp480Sl5LiterImage from '../images/products/Pillar_Up_480_SL_5Liter.avif';
import pillarUp480Sl1LiterImage from '../images/products/Pillar_Up_480_SL_1Liter.avif';
import touchdown480Sl20LitersImage from '../images/products/Touchdown_480_SL_20Liters.avif';
import touchdown480Sl4LiterImage from '../images/products/Touchdown_480_SL_4Liters.avif';
import touchdown480Sl1LiterImage from '../images/products/Touchdown_480_SL_1Liters.avif';
import eagle480Sl20LitersImage from '../images/products/Eagle_480_SL_20Liters.avif';
import eagle480Sl1LiterImage from '../images/products/Eagle_480_SL_1Liter.avif';
import smart486Sl20LitersImage from '../images/products/Smart_486_SL_20Liters.avif';
import smart486Sl4LitersImage from '../images/products/Smart_486_SL_4Liter.avif';
import smart486Sl1LiterImage from '../images/products/Smart_486_SL_1Liter.avif';
import konUp480Sl1LiterImage from '../images/products/Kon_Up_480_SL_1Liter.avif';
import triester670Ec250mlImage from '../images/products/Triester_670_EC_250ml.avif';
import triester670Ec100mlImage from '../images/products/Triester_670_EC_100ml.avif';
import daimex80Wp250grImage from '../images/products/Daimex_80_WP_250gr.avif';
import marxone300Sl5LiterImage from '../images/products/Marxone_300_SL_5Liter.avif';
import marxone300Sl20LiterImage from '../images/products/Marxone_300_SL_20Liter.avif';
import batara135Sl20LiterImage from '../images/products/Batara_135_SL_20Liter.avif';
import batara135Sl4LiterImage from '../images/products/Batara_135_SL_4Liter.avif';
import batara135Sl1LiterImage from '../images/products/Batara_135_SL_1Liter.avif';
import metsulindo20Wp100GrImage from '../images/products/Metsulindo_20_WP_100gr.avif';
import metsulindo20Wp250grImage from '../images/products/Metsulindo_20_WP_250gr.avif';
import supremo480Sl20LImage from '../images/products/Supremo_480_SL_20L.avif';
import supremo480Sl4LImage from '../images/products/Supremo_480_SL_4L.avif';
import supremo480Sl1LImage from '../images/products/Supremo_480_SL_1L.avif';
import topzone276Sl4LiterImage from '../images/products/Topzone_276_SL_4Liter.avif';
import topzone276Sl20LiterImage from '../images/products/Topzone_276_SL_20Liter.avif';
import supretox276Sl4LiterImage from '../images/products/Supretox_276_SL_4Liter.avif';
import supretox276Sl1LiterImage from '../images/products/Supretox_276_SL_1Liter.avif';
import roundUp486Sl4LiterImage from '../images/products/Round_Up_486_SL_4Liter.avif';
import ramoxone278Sl20LiterImage from '../images/products/Ramoxone_278_SL_20Liter.avif';
import ramoxone278Sl1LiterImage from '../images/products/Ramoxone_278_SL_1Liter.avif';
import predo290Sl20LiterImage from '../images/products/Predo_290_SL_20Liter.avif';
import predo290Sl1LiterImage from '../images/products/Predo_290_SL_1Liter.avif';
import noxone297Sl5LiterImage from '../images/products/Noxone_297_SL_5Liter.avif';
import noxone297Sl1LiterImage from '../images/products/Noxone_297_SL_1Liter.avif';
import herbatop276Sl5LiterImage from '../images/products/Herbatop_276_SL_5Liter.avif';
import herbatop276Sl20LiterImage from '../images/products/Herbatop_276_SL_20Liter.avif';
import herbatop276Sl1LiterImage from '../images/products/Herbatop_276_SL_1Liter.avif';
import gramoxone276Sl250mlImage from '../images/products/Gramoxone_276SL_250ml.avif';
import gramoxone276Sl20LiterImage from '../images/products/Gramoxone_276_SL_20Liter.avif';
import gramoxone276Sl5LiterImage from '../images/products/Gramoxone_276_SL_5Liter.avif';
import gramoxone276Sl1LiterImage from '../images/products/Gramoxone_276_SL_1Liter.avif';
import centatop288Sl5LiterImage from '../images/products/Centatop_288_SL_5Liter.avif';
import centatop288Sl20LiterImage from '../images/products/Centatop_288_SL_20Liter.avif';
import centatop288Sl1LiterImage from '../images/products/Centatop_288_SL_1Liter.avif';
import bablass490Sl5LiterImage from '../images/products/Bablass_490_SL_5Liter.avif';
import bablass490Sl20LiterImage from '../images/products/Bablass_490_SL_20Liter.avif';
import bablass490Sl1LiterImage from '../images/products/Bablass_490_SL_1Liter.avif';
import npkDgw1362750kgImage from '../images/products/NPK_DGW_13_6_27_50kg.avif';
import merokeKornKaliBKkb50kgImage from '../images/products/Meroke_Korn_Kali_B_(KKB)_50kg.avif';
import pupukSawitpro50kgImage from '../images/products/Pupuk_SawitPRO_50kg.avif';
import kaosAgenInovasiSawitproImage from '../images/products/Kaos_Agen_Inovasi_SawitPRO.avif';
import topiSawitproImage from '../images/products/Topi_SawitPRO.avif';
import kaosAgenInovasiPlusTopiHijauPlusGoodieBagImage from '../images/products/Kaos_Agen_Inovasi_+_Topi_Hijau_+_Goodie_Bag.avif';
import herbisidaTopzone276Sl1LiterImage from '../images/products/Herbisida_Topzone_276_SL_1Liter.avif';
import herbisidaRoundUp486Sl1LiterImage from '../images/products/Herbisida_Round_Up_486_SL_1Liter.avif';
import supretox276Sl20LiterAltImage from '../images/products/Supretox_276_SL_20Liter.avif';
import herbisidaNoxone297Sl20LiterImage from '../images/products/Herbisida_Noxone_297_SL_20Liter.avif';
import herbisidaRoundUp486Sl20LiterImage from '../images/products/Herbisida_Round_Up_486_SL_20Liter.avif';
import tspChinaCapDaun50kgImage from '../images/products/TSP_China_Cap_Daun_50kg.avif';
import npkDgw138274Te50kgImage from '../images/products/NPK_DGW_13_8_27_4_TE_50kg.avif';
import rpCapDaun50kgImage from '../images/products/RP_Cap_Daun_50kg.avif';
import kapurPertanianKebomas50KgImage from '../images/products/Kapur_Pertanian_Kebomas_50kg.avif';
import ssAmmophos50kgImage from '../images/products/SS_(AMMOPHOS)_50kg.avif';
import rpMahkota50kgEgyptImage from '../images/products/RP_Mahkota_50kg_Egypt.avif';
import dolomiteM10050kgImage from '../images/products/Dolomite_M_100_50kg.avif';
import npkMutiara16161650kgImage from '../images/products/NPK_Mutiara_16_16_16_50kg.avif';
import npkYaramila16161650kgImage from '../images/products/NPK_Yaramila_16_16_16_50kg.avif';
import borateMahkota25kgImage from '../images/products/Borate_Mahkota_25kg.avif';
import npkPhonskaPlus15151525kgImage from '../images/products/NPK_Phonska_Plus_15_15_15_25kg.avif';
import mahkotaZa50kgImage from '../images/products/Mahkota_ZA_50kg.avif';
import pupukMopKclCanadaCapMahkota50KgImage from '../images/products/Pupuk_MOP_KCL_Canada_Cap_Mahkota_50kg.avif';

const ProductContext = createContext();

export const PRODUCT_DATA = [
    
    // New Products from the list
    { product_id: "sawitpro-fertilizer-bunch-ash", name: "SawitPRO Fertilizer 50kg + 40kg Bunch Ash", price: 315934, description: "High quality fertilizer with bunch ash.", rating: 4.5, image: sawitproFertilizer50kgPlus40kgBunchAshImage },
    { product_id: "sibrondol-tshirt-xl", name: "Si Brondol SawitPRO T-shirt size XL", price: 85000, description: "Comfortable T-shirt from SawitPRO.", rating: 4.3, image: siBrondolSawitproTshirtSizeXlImage },
    { product_id: "furadan-3gr-2kg", name: "Furadan 3GR 2Kg", price: 54503, description: "Effective insecticide.", rating: 4.6, image: furadan3gr2kgImage },
    { product_id: "garlon-670ec-1l", name: "Garlon 670 EC - 1 Liter", price: 299606, description: "Herbicide for broad-leaved weeds.", rating: 4.7, image: garlon670Ec1LiterImage },
    { product_id: "garlon-670ec-100ml", name: "Garlon 670 EC - 100ml", price: 49350, description: "Herbicide for broad-leaved weeds.", rating: 4.7, image: garlon670Ec100mlImage },
    { product_id: "bombup-520sl-20l", name: "Bomb Up 520 SL - 20 Liters", price: 1021558, description: "Systemic herbicide.", rating: 4.5, image: bombUp520Sl20LitersImage },
    { product_id: "bombup-520sl-5l", name: "Bomb Up 520 SL - 5 Liter", price: 272369, description: "Systemic herbicide.", rating: 4.5, image: bombUp520Sl5LiterImage },
    { product_id: "post-480sl-1l", name: "Post 480 SL - 1 Liter", price: 77075, description: "Herbicide.", rating: 4.4, image: post480Sl1LiterImage },
    { product_id: "pillarup-480sl-20l", name: "Pillar Up 480 SL - 20 Liter", price: 1111765, description: "Herbicide.", rating: 4.6, image: pillarUp480Sl20LiterImage },
    { product_id: "pillarup-480sl-5l", name: "Pillar Up 480 SL - 5 Liter", price: 294158, description: "Herbicide.", rating: 4.6, image: pillarUp480Sl5LiterImage },
    { product_id: "pillarup-480sl-1l", name: "Pillar Up 480 SL - 1 Liter", price: 63863, description: "Herbicide.", rating: 4.6, image: pillarUp480Sl1LiterImage },
    { product_id: "touchdown-480sl-20l", name: "Touchdown 480 SL - 20 Liters", price: 1143530, description: "Non-selective herbicide.", rating: 4.7, image: touchdown480Sl20LitersImage },
    { product_id: "touchdown-480sl-4l", name: "Touchdown 480 SL - 4 Liter", price: 261474, description: "Non-selective herbicide.", rating: 4.7, image: touchdown480Sl4LiterImage },
    { product_id: "touchdown-480sl-1l", name: "Touchdown 480 SL - 1 Liter", price: 71569, description: "Non-selective herbicide.", rating: 4.7, image: touchdown480Sl1LiterImage },
    { product_id: "eagle-480sl-20l", name: "Eagle 480 SL - 20 Liters", price: 1111765, description: "Herbicide.", rating: 4.5, image: eagle480Sl20LitersImage },
    { product_id: "eagle-480sl-1l", name: "Eagle 480 SL - 1 Liter", price: 66064, description: "Herbicide.", rating: 4.5, image: eagle480Sl1LiterImage },
    { product_id: "smart-486sl-20l", name: "Smart 486 SL - 20 Liters", price: 1053818, description: "Herbicide.", rating: 4.6, image: smart486Sl20LitersImage },
    { product_id: "smart-486sl-4l", name: "Smart 486 SL - 4 Liters", price: 250580, description: "Herbicide.", rating: 4.6, image: smart486Sl4LitersImage },
    { product_id: "smart-486sl-1l", name: "Smart 486 SL - 1 Liter", price: 71569, description: "Herbicide.", rating: 4.6, image: smart486Sl1LiterImage },
    { product_id: "konup-480sl-1l", name: "Kon Up 480 SL - 1 Liter", price: 55054, description: "Herbicide.", rating: 4.3, image: konUp480Sl1LiterImage },
    { product_id: "triester-670ec-250ml", name: "Triester 670 EC - 250ml", price: 245133, description: "Herbicide.", rating: 4.4, image: triester670Ec250mlImage },
    { product_id: "triester-670ec-100ml", name: "Triester 670 EC - 100ml", price: 38538, description: "Herbicide.", rating: 4.4, image: triester670Ec100mlImage },
    { product_id: "daimex-80wp-250gr", name: "Daimex 80 WP - 250gr", price: 55054, description: "Fungicide.", rating: 4.5, image: daimex80Wp250grImage },
    { product_id: "marxone-300sl-5l", name: "Marxone 300 SL - 5 Liter", price: 250034, description: "Herbicide.", rating: 4.6, image: marxone300Sl5LiterImage },
    { product_id: "marxone-300sl-20l", name: "Marxone 300 SL - 20 Liter", price: 914026, description: "Herbicide.", rating: 4.6, image: marxone300Sl20LiterImage },
    { product_id: "batara-135sl-20l", name: "Batara 135 SL - 20 Liter", price: 748724, description: "Herbicide.", rating: 4.4, image: batara135Sl20LiterImage },
    { product_id: "batara-135sl-4l", name: "Batara 135 SL - 4 Liter", price: 163421, description: "Herbicide.", rating: 4.4, image: batara135Sl4LiterImage },
    { product_id: "batara-135sl-1l", name: "Batara 135 SL - 1 Liter", price: 44043, description: "Herbicide.", rating: 4.4, image: batara135Sl1LiterImage },
    { product_id: "metsulindo-20wp-100gr", name: "Metsulindo 20 WP - 100 gr", price: 33936, description: "Herbicide.", rating: 4.3, image: metsulindo20Wp100GrImage },
    { product_id: "metsulindo-20wp-250gr", name: "Metsulindo 20 WP - 250gr", price: 49991, description: "Herbicide.", rating: 4.3, image: metsulindo20Wp250grImage },
    { product_id: "supremo-480sl-20l", name: "Supremo 480 SL - 20 L", price: 1323530, description: "Herbicide.", rating: 4.7, image: supremo480Sl20LImage },
    { product_id: "supremo-480sl-4l", name: "Supremo 480 SL - 4 L", price: 294158, description: "Herbicide.", rating: 4.7, image: supremo480Sl4LImage },
    { product_id: "supremo-480sl-1l", name: "Supremo 480 SL - 1 L", price: 77075, description: "Herbicide.", rating: 4.7, image: supremo480Sl1LImage },
    { product_id: "topzone-276sl-4l", name: "Topzone 276 SL - 4 Liter", price: 207000, description: "Herbicide.", rating: 4.5, image: topzone276Sl4LiterImage },
    { product_id: "topzone-276sl-20l", name: "Topzone 276 SL - 20 Liter", price: 914026, description: "Herbicide.", rating: 4.5, image: topzone276Sl20LiterImage },
    { product_id: "supretox-276sl-4l", name: "Supretox 276 SL - 4 Liter", price: 223070, description: "Herbicide.", rating: 4.6, image: supretox276Sl4LiterImage },
    { product_id: "supretox-276sl-1l", name: "Supretox 276 SL - 1 Liter", price: 57256, description: "Herbicide.", rating: 4.6, image: supretox276Sl1LiterImage },
    { product_id: "roundup-486sl-4l", name: "Round Up 486 SL - 4 Liter", price: 326843, description: "Herbicide.", rating: 4.8, image: roundUp486Sl4LiterImage },
    { product_id: "ramoxone-278sl-20l", name: "Ramoxone 278 SL - 20 Liter", price: 1057022, description: "Herbicide.", rating: 4.5, image: ramoxone278Sl20LiterImage },
    { product_id: "ramoxone-278sl-1l", name: "Ramoxone 278 SL - 1 Liter", price: 49549, description: "Herbicide.", rating: 4.5, image: ramoxone278Sl1LiterImage },
    { product_id: "predo-290sl-20l", name: "Predo 290 SL - 20 Liter", price: 860260, description: "Herbicide.", rating: 4.4, image: predo290Sl20LiterImage },
    { product_id: "predo-290sl-1l", name: "Predo 290 SL - 1 Liter", price: 55890, description: "Herbicide.", rating: 4.4, image: predo290Sl1LiterImage },
    { product_id: "noxone-297sl-5l", name: "Noxone 297 SL - 5 Liter", price: 310500, description: "Herbicide.", rating: 4.6, image: noxone297Sl5LiterImage },
    { product_id: "noxone-297sl-1l", name: "Noxone 297 SL - 1 Liter", price: 66064, description: "Herbicide.", rating: 4.6, image: noxone297Sl1LiterImage },
    { product_id: "herbatop-276sl-5l", name: "Herbatop 276 SL - 5 Liter", price: 392211, description: "Herbicide.", rating: 4.7, image: herbatop276Sl5LiterImage },
    { product_id: "herbatop-276sl-20l", name: "Herbatop 276 SL - 20 Liter", price: 1461177, description: "Herbicide.", rating: 4.7, image: herbatop276Sl20LiterImage },
    { product_id: "herbatop-276sl-1l", name: "Herbatop 276 SL - 1 Liter", price: 82581, description: "Herbicide.", rating: 4.7, image: herbatop276Sl1LiterImage },
    { product_id: "gramoxone-276sl-250ml", name: "Gramoxone 276SL - 250ml", price: 33032, description: "Herbicide.", rating: 4.8, image: gramoxone276Sl250mlImage },
    { product_id: "gramoxone-276sl-20l", name: "Gramoxone 276 SL - 20 Liter", price: 1111765, description: "Herbicide.", rating: 4.8, image: gramoxone276Sl20LiterImage },
    { product_id: "gramoxone-276sl-5l", name: "Gramoxone 276 SL - 5 Liter", price: 321395, description: "Herbicide.", rating: 4.8, image: gramoxone276Sl5LiterImage },
    { product_id: "gramoxone-276sl-1l", name: "Gramoxone 276 SL - 1 Liter", price: 74674, description: "Herbicide.", rating: 4.8, image: gramoxone276Sl1LiterImage },
    { product_id: "centatop-288sl-5l", name: "Centatop 288 SL - 5 Liter", price: 250580, description: "Herbicide.", rating: 4.5, image: centatop288Sl5LiterImage },
    { product_id: "centatop-288sl-20l", name: "Centatop 288 SL - 20 Liter", price: 935533, description: "Herbicide.", rating: 4.5, image: centatop288Sl20LiterImage },
    { product_id: "centatop-288sl-1l", name: "Centatop 288 SL - 1 Liter", price: 52851, description: "Herbicide.", rating: 4.5, image: centatop288Sl1LiterImage },
    { product_id: "bablass-490sl-5l", name: "Bablass 490 SL - 5 Liter", price: 250580, description: "Herbicide.", rating: 4.6, image: bablass490Sl5LiterImage },
    { product_id: "bablass-490sl-20l", name: "Bablass 490 SL - 20 Liter", price: 924780, description: "Herbicide.", rating: 4.6, image: bablass490Sl20LiterImage },
    { product_id: "bablass-490sl-1l", name: "Bablass 490 SL - 1 Liter", price: 52851, description: "Herbicide.", rating: 4.6, image: bablass490Sl1LiterImage },
    { product_id: "npk-dgw-13627-50kg", name: "NPK DGW 13-6-27 50kg", price: 392938, description: "NPK Fertilizer.", rating: 4.7, image: npkDgw1362750kgImage },
    { product_id: "meroke-kornkali-50kg", name: "Meroke Korn Kali B (KKB) 50kg", price: 399251, description: "Potassium fertilizer.", rating: 4.8, image: merokeKornKaliBKkb50kgImage },
    { product_id: "pupuk-sawitpro-50kg", name: "Pupuk SawitPRO 50kg", price: 197944, description: "Specialized SawitPRO fertilizer.", rating: 4.9, image: pupukSawitpro50kgImage },
    { product_id: "kaos-agen-inovasi", name: "Kaos Agen Inovasi SawitPRO", price: 60000, description: "SawitPRO agent T-shirt.", rating: 4.2, image: kaosAgenInovasiSawitproImage },
    { product_id: "topi-sawitpro", name: "Topi SawitPRO", price: 35000, description: "SawitPRO cap.", rating: 4.1, image: topiSawitproImage },
    { product_id: "kaos-topi-goodiebag", name: "Kaos Agen Inovasi + Topi Hijau + Goodie Bag", price: 90000, description: "SawitPRO merchandise bundle.", rating: 4.4, image: kaosAgenInovasiPlusTopiHijauPlusGoodieBagImage },
    { product_id: "herbisida-topzone-1l", name: "Herbisida Topzone 276 SL - 1 Liter", price: 55054, description: "Herbicide.", rating: 4.5, image: herbisidaTopzone276Sl1LiterImage },
    { product_id: "herbisida-roundup-1l", name: "Herbisida Round Up 486 SL - 1 Liter", price: 88086, description: "Herbicide.", rating: 4.8, image: herbisidaRoundUp486Sl1LiterImage },
    { product_id: "supretox-276sl-20l-alt", name: "Supretox 276 SL - 20 Liter", price: 946286, description: "Herbicide.", rating: 4.6, image: supretox276Sl20LiterAltImage },
    { product_id: "herbisida-noxone-20l", name: "Herbisida Noxone 297 SL - 20 Liter", price: 1111765, description: "Herbicide.", rating: 4.6, image: herbisidaNoxone297Sl20LiterImage },
    { product_id: "herbisida-roundup-20l", name: "Herbisida Round Up 486 SL - 20 Liter", price: 1535294, description: "Herbicide.", rating: 4.8, image: herbisidaRoundUp486Sl20LiterImage },
    { product_id: "tsp-china-capdaun-50kg", name: "TSP China Cap Daun 50kg", price: 482000, description: "TSP fertilizer.", rating: 4.7, image: tspChinaCapDaun50kgImage },
    { product_id: "npk-dgw-13827-50kg", name: "NPK DGW 13-8-27-4 TE 50kg", price: 416846, description: "NPK fertilizer with trace elements.", rating: 4.8, image: npkDgw138274Te50kgImage },
    { product_id: "rp-capdaun-50kg", name: "RP Cap Daun 50Kg", price: 141536, description: "Rock Phosphate fertilizer.", rating: 4.5, image: rpCapDaun50kgImage },
    { product_id: "kapur-kebomas-50kg", name: "Kapur Pertanian Kebomas 50 Kg", price: 64688, description: "Agricultural lime.", rating: 4.4, image: kapurPertanianKebomas50KgImage },
    { product_id: "ss-ammophos-50kg", name: "SS (AMMOPHOS) 50kg", price: 508444, description: "Ammophos fertilizer.", rating: 4.6, image: ssAmmophos50kgImage },
    { product_id: "rp-mahkota-egypt-50kg", name: "RP Mahkota 50kg - Egypt", price: 138949, description: "Rock Phosphate from Egypt.", rating: 4.5, image: rpMahkota50kgEgyptImage },
    { product_id: "dolomite-m100-50kg", name: "Dolomite M-100 50kg", price: 49680, description: "Dolomite fertilizer.", rating: 4.3, image: dolomiteM10050kgImage },
    { product_id: "npk-mutiara-161616-50kg", name: "NPK Mutiara 16-16-16 50kg", price: 745718, description: "Balanced NPK fertilizer.", rating: 4.9, image: npkMutiara16161650kgImage },
    { product_id: "npk-yaramila-161616-50kg", name: "NPK Yaramila 16-16-16 50kg", price: 757103, description: "Balanced NPK fertilizer.", rating: 4.9, image: npkYaramila16161650kgImage },
    { product_id: "borate-mahkota-25kg", name: "Borate Mahkota - 25kg", price: 375451, description: "Borate fertilizer.", rating: 4.7, image: borateMahkota25kgImage },
    { product_id: "npk-phonska-plus-25kg", name: "NPK Phonska Plus 15-15-15 25kg", price: 232875, description: "100% Asli NPK fertilizer.", rating: 4.8, image: npkPhonskaPlus15151525kgImage },
    { product_id: "mahkota-za-50kg", name: "Mahkota ZA 50kg", price: 291110, description: "ZA fertilizer.", rating: 4.6, image: mahkotaZa50kgImage },
    { product_id: "mop-kcl-canada-mahkota-50kg", name: "Pupuk MOP/KCL Canada Cap Mahkota 50 kg", price: 359067, description: "100% Asli MOP/KCL fertilizer.", rating: 4.9, image: pupukMopKclCanadaCapMahkota50KgImage },
];

export const ProductProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);

    const addToCart = (product) => {
        setCart(prev => [...prev, product]);
    };

    const addToRecentActivity = (product) => {
        setRecentActivity(prev => [product, ...prev]);
    };

    const getProductById = (id) => {
        return PRODUCT_DATA.find(product => product.product_id === id);
    };

    return (
        <ProductContext.Provider value={{ 
            products: PRODUCT_DATA,
            cart,
            addToCart,
            recentActivity,
            addToRecentActivity,
            getProductById // Add getProductById to the context value
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProducts = () => useContext(ProductContext);
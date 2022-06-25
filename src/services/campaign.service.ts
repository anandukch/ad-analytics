import { ACCESS_TOKEN, ACC_ID } from '@/config';
import axios from 'axios';
import { NextFunction, Request, Response } from 'express';

class CampaignService {
  public async index() {
    try {
      let slug = `/act_${ACC_ID}/campaigns?fields=id,name,objective`;
      const objectRequest = await axios.get(`https://graph.facebook.com/v12.0${slug}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      const { data } = objectRequest.data;
      return data;
    } catch (error) {
      console.log(error);

      return error.message;
    }
  }
  public async create(){
    try {
      const response: any = await axios.post(
        `https://graph.facebook.com/v14.0/act_${ACC_ID}/campaigns`,
        {
          access_token: ACCESS_TOKEN,
          name:`CampaignKch-${Math.random().toString(36).substring(2, 6)}`,
          objective:"LINK_CLICKS",
          // lifetime_budget: lifeTimeBudget * 100,
          // lifetime_budget: 12 * 100 ,
          // bid_strategy:  'LOWEST_COST_WITHOUT_CAP',
          status:'ACTIVE',
          special_ad_categories: [],
        }
      );
      return {
        success:true,
        message:"campaign created successfully",
        data:response
      }
    } catch (error) {
      console.log(error.message);
    }
    
  }

  public getDetails= async (platformCampaignId:any,objectType:'ads' | 'adsets')=>{
    try {
      let slug = `/${platformCampaignId}/${objectType}?fields=id,name`;

        const objectRequest = await axios.get( `https://graph.facebook.com/v12.0/${slug}`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            }
        });
        
        return objectRequest.data
    } catch (error) {
      console.log(error.message);
      
    }
  }
  public createAdSets= async (campId:any)=>{
    try {
      const response: any = await axios.post(
        `https://graph.facebook.com/v14.0/act_${ACC_ID}/adsets`,
        {
          access_token: ACCESS_TOKEN,
          name:"My Ad Set",
          optimization_goal:"REACH",
          billing_event:"IMPRESSIONS",
          bid_amount:2,
          daily_budget:1000,
          campaign_id:campId,
          targeting:{"geo_locations":{"countries":["IN"]}},
          status:"PAUSED",
        }
      );
      return response.data
    } catch (error) {
      
    }
  }
}
export default CampaignService;

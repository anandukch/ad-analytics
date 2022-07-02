import { ACCESS_TOKEN, ACC_ID } from '@/config';
import { HttpException } from '@/exceptions/HttpException';
import axios from 'axios';
import * as fs from 'fs';

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
      throw new HttpException(500, error);
    }
  }
  public async create() {
    try {
      const response: any = await axios.post(`https://graph.facebook.com/v12.0/act_${ACC_ID}/campaigns`, {
        access_token: ACCESS_TOKEN,
        name: `CampaignKch-${Math.random().toString(36).substring(2, 6)}`,
        objective: 'LINK_CLICKS',
        // lifetime_budget: lifeTimeBudget * 100,
        lifetime_budget: 12 * 1000,
        // bid_strategy:  'LOWEST_COST_WITHOUT_CAP',
        bid_strategy: 'LOWEST_COST_WITH_BID_CAP',
        status: 'PAUSED',
        special_ad_categories: [],
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data.error);
      throw new HttpException(500, error);
    }
  }

  public getDetails = async (platformCampaignId: any, objectType: 'ads' | 'adsets') => {
    try {
      let slug = `/${platformCampaignId}/${objectType}?fields=id,name`;

      const objectRequest = await axios.get(`https://graph.facebook.com/v12.0/${slug}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });

      return objectRequest.data;
    } catch (error) {
      console.log(error.message);
      throw new HttpException(500, error);
    }
  };
  public createAdSets = async (campId: any) => {
    try {
      const response: any = await axios.post(`https://graph.facebook.com/v12.0/act_${ACC_ID}/adsets`, {
        access_token: ACCESS_TOKEN,
        name: 'Sample test',
        // daily_budget: '1000',
        // // bid_amount: '2',
        // billing_event: 'LINK_CLICKS',
        // // optimization_goal: '',
        // campaign_id: campId,
        // promoted_object: { application_id: '<appID>', object_store_url: '<appLink>' },
        // daily_budget: '1000',
        start_time: '2022-05-30T13:25:52-0700',
        end_time: '2022-08-06T13:25:52-0700',
        // campaign_id: campId,
        bid_amount: '100',
        billing_event: 'IMPRESSIONS',
        optimization_goal: 'POST_ENGAGEMENT',
        targeting: {
          // device_platforms: ['mobile'],
          // facebook_positions: ['feed'],
          geo_locations: { countries: ['US'] },
          // publisher_platforms: ['facebook', 'audience_network'],
        },
        status: 'PAUSED',
      });
      return response.data;
    } catch (error) {
      throw new HttpException(500, error.response.data.error);
    }
  };

  public createCreative = async (adSetId: any) => {
    try {
      // const response: any = await axios.post(`https://graph.facebook.com/v12.0/act_${ACC_ID}/ads`, {
      //   access_token: ACCESS_TOKEN,
      //   name: 'Sample test',
      //   adset_id: adSetId,
      //   creative: {
      //     object_story_spec: {
      //       page_id: ,
      //       link_data: {
      //         link: '<appLink>',
      //         message: '<message>',
      //         call_to_action: {
      //           type: 'OPEN_LINK',
      //           value: '<callToAction>',
      //         },
      //       },
      //     },
      //   },
      //   status: 'PAUSED',
      // });

      // turn image inti byte
      const image = fs.readFileSync('./image.png');
      const imageBase64 = Buffer.from(image).toString('base64');

      let imgResponse = await axios.post(`https://graph.facebook.com/v12.0/act_${ACC_ID}/adimages`, {
        access_token: ACCESS_TOKEN,
        filename: '@/image.png',
      });
      // let creativeRes=await axios.post(`https://graph.facebook.com/v12.0/act_${ACC_ID}/adcreative`, {
      //   access_token: ACCESS_TOKEN,
      //   name: 'Sample creative',
        

      // })
      console.log(imgResponse.data);

      // return response.data;
    } catch (error) {
      throw new HttpException(500, error.response.data.error);
    }
  };
  public createAd = async (adSetId: any) => {
    try {
      // const response: any = await axios.post(`https://graph.facebook.com/v12.0/act_${ACC_ID}/ads`, {
      //   access_token: ACCESS_TOKEN,
      //   name: 'Sample test',
      //   start_time: '2022-05-30T13:25:52-0700',
      //   end_time: '2022-08-06T13:25:52-0700',
      //   adset_id: adSetId,
      //   bid_amount: '100',
      //   billing_event: 'IMPRESSIONS',
      //   optimization_goal: 'POST_ENGAGEMENT',
      //   targeting: {
      //     geo_locations: { countries: ['US'] },
      //   },
      //   status: 'PAUSED',
      // });
      // console.log(response.data);
      // return response.data;
    } catch (error) {
      console.log(error.response.data.error);
    }
  };

  public getInsights = async (platformCampaignId?: any, objectType?: 'ads' | 'adsets') => {
    try {
      const response: any = await axios.get(`https://graph.facebook.com/v12.0/act_${ACC_ID}/insights`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
}
export default CampaignService;

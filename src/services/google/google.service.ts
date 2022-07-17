import axios from 'axios';
import { generateRandom } from './utils';

class GoogleService {

  public async createCampaign({ customerId, accessToken, developerToken, startDate, endDate, resourceName }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/campaigns:mutate`,
      {
        operations: [
          {
            create: {
              name: `TestCampaign${generateRandom()}`,
              status: 'PAUSED',
              startDate,
              endDate,
              campaignBudget: resourceName,
              advertisingChannelType: 'SEARCH',
              networkSettings: {
                targetGoogleSearch: true,
                targetSearchNetwork: true,
                targetContentNetwork: true,
                targetPartnerSearchNetwork: false,
              },
              target_spend: {},
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );

    return res.data.results[0];
  }


  public async createBudget({ customerId, accessToken, developerToken, amount }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/campaignBudgets:mutate`,
      {
        operations: [
          {
            create: {
              name: `An example budget ${generateRandom()}`,
              deliveryMethod: 'STANDARD',
              amountMicros: 1_000_000 * amount,
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );
    console.log(res.data.results[0].resourceName);

    return res.data.results[0];
  }
  public async createAdGroup({ accessToken, customerId, resourceName, developerToken, name }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/adGroups:mutate`,
      {
        operations: [
          {
            create: {
              name,
              status: 'PAUSED',
              type: 'SEARCH_STANDARD',
              cpcBidMicros: 200_000,
              // campaign: `customers/${customerId}/campaigns/${campaignId}`,
              campaign: resourceName,
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );
    return res.data.results[0];
  }

  public async createSearchAd({ accessToken, developerToken, customerId, resourceName, headlines, descriptions, websiteURL }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/adGroupAds:mutate`,
      {
        operations: [
          {
            create: {
              // adGroup: `customers/${customerId}/adGroups/${adGroupId}`,
              adGroup: resourceName,
              status: 'PAUSED',
              ad: {
                finalUrls: [websiteURL],
                responsiveSearchAd: {
                  headlines: [
                    {
                      text: headlines[0],
                    },
                    {
                      text: headlines[1],
                    },
                    {
                      text: headlines[2],
                    },
                  ],
                  descriptions: [
                    {
                      text: descriptions[0],
                    },
                    {
                      text: descriptions[1],
                    },
                  ],
                },
              },
            },
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );
    // console.log(res.data);
    //    console.log("res");

    return res.data.results[0];
  }

  public async getCampaign({ accessToken, developerToken, customerId }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/googleAds:searchStream`,
      {
        query: `SELECT campaign.name,campaign.id,campaign.status,campaign.start_date
                  FROM campaign`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );
    return res.data[0].results;
  }

  public async getAdGroupAds({ accessToken, developerToken, customerId }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/googleAds:searchStream`,
      {
        query: `SELECT campaign.name,campaign.id,campaign.status,campaign.start_date,ad_group.id,ad_group.name
                FROM ad_group_ad`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );
    return res.data[0].results;
  }
  public async getAdGroup({ accessToken, developerToken, customerId }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/googleAds:searchStream`,
      {
        query: `SELECT campaign.name,campaign.id,campaign.status,campaign.start_date,ad_group.id,ad_group.name
                FROM ad_group`,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
          'developer-token': developerToken,
        },
      },
    );
    return res.data[0].results;
  }


  public async setCampaignTargetLocation(){
    try {
      
    } catch (error) {
      
    }
  }
}

export default GoogleService;

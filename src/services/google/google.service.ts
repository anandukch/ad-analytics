import axios from 'axios';
import { generateRandom } from './utils';

class GoogleService {
  public async createCampaign({ customerId, accessToken, developerToken, budgetId, startDate, endDate }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/campaigns:mutate`,
      {
        operations: [
          {
            create: {
              name: `Test${generateRandom()}`,
              status: 'PAUSED',
              startDate,
              endDate,
              campaignBudget: `customers/${customerId}/campaignBudgets/${budgetId}`,
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

    return {
      id: res.data.results[0].resourceName.split('/').at(-1),
      resourceName: res.data.results[0].resourceName,
    };
  }
  public async createAdGroup({ accessToken, customerId, campaignId, developerToken, name }) {
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
              campaign: `customers/${customerId}/campaigns/${campaignId}`,
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
    return {
      id: res.data.results[0].resourceName.split('/').at(-1),
      resourceName: res.data.results[0].resourceName,
    };
  }

  public async createSearchAd({ accessToken, developerToken, customerId, adGroupId, headlines, descriptions, websiteURL }) {
    const res = await axios.post(
      `https://googleads.googleapis.com/v11/customers/${customerId}/adGroupAds:mutate`,
      {
        operations: [
          {
            create: {
              adGroup: `customers/${customerId}/adGroups/${adGroupId}`,
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
    return {
      id: res.data.results[0].resourceName.split('/').at(-1),
      resourceName: res.data.results[0].resourceName,
    };
  }

  public async adKeywordCritertionToAdGroup({ accessToken, developerToken, customerId, adGroupId, keywords, websiteURL }) {
    try {
      const operations = keywords.map(keyword => {
        return {
          create: {
            type: 'KEYWORD',
            adGroup: `customers/${customerId}/adGroups/${adGroupId}`,
            finalUrls: [websiteURL],
            keyword: {
              text: keyword,
              matchType: 'BROAD',
            },
            status: 'ENABLED',
          },
        };
      });
      const res = await axios.post(
        `https://googleads.googleapis.com/v11/customers/${customerId}/adGroupCriteria:mutate`,
        {
          operations: operations,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'developer-token': developerToken,
          },
        },
      );
      console.log(res.data.results);
      return true;
    } catch (error) {
      console.log(error?.response?.data?.error || error);
      return false;
    }
  }

  public async getCampaign({ accessToken, developerToken, customerId }) {
    const res = await axios
      .post(
        `https://googleads.googleapis.com/v11/customers/${customerId}/googleAds:searchStream`,
        {
          query: `SELECT campaign.name
                FROM campaign`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
            'developer-token': developerToken,
          },
        },
      )
      return res.data[0].results;
      // .then(res => {
        
        
      //   return res.data[0].results;
      // })
      // .catch(err => {
      //   console.log(err.response.data[0].error.details[0].errors);
      // });
    // console.log(res.data[0].results.forEach(result => {
    //   console.log(result.campaign.id,result.campaign.name);

    // }));
    // console.log(res.data[0].results);

    // return res.data[0].results;
  }
}

export default GoogleService;


import { GOOGLE_CLIENT_ID, GOOGLE_DEVELOPER_TOKEN } from '@/config';
import GoogleService from '@/services/google/google.service';
import { generateAccessToken, generateRandom } from '@/services/google/utils';
import { NextFunction, Request, Response } from 'express';
class GoogleController {
  public googleService: GoogleService= new GoogleService();
  private developerToken = GOOGLE_DEVELOPER_TOKEN;
  private customerId = "5921661095";
  private refreshToken = '1//0gncKtuGhzPxHCgYIARAAGBASNwF-L9IrtBeBmmW871Y-vuvb1gbYDrQ1NFEc7MQt8Bh35YqifjBc54ISPdcQZxAlN9OHFtIqhKI';
  public getCampaignList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {

      const accessToken =await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let s = await this.googleService.getCampaign({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
      });
      console.log(s);
      
      res.status(200).json({
        success: true,
        message: 'campaign list fetched successfully',
        data: s,
      });
    } catch (error) {
      console.log(error.message);
      
      next(error);
    }
  };

  public createCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken =await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let budget= await this.googleService.createBudget({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        amount: 5,
      })
      let campaign=await this .googleService.createCampaign({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        budgetId: budget.id,
        startDate: '2019-01-01',
        endDate: '2019-12-31'
      })
      let adGrp=await this.googleService.createAdGroup({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        campaignId: campaign.id,
        name: `ad-group-${generateRandom()}`
      })
      let ad=await this.googleService.createSearchAd({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        adGroupId: adGrp.id,
        headlines: ['how are you', 'hope all is well', 'need help '],
        descriptions: ['call to talk', 'we are always hear'],
        websiteURL: 'https://www.markopolo.ai/help'
      })

      // let campaign= await this.googleService.createCampaign({
      //   accessToken: accessToken,
      //   developerToken: this.developerToken,
      //   customerId: this.customerId,
      //   budgetId: budget.id, 
      //   startDate: '2022-07-01',
      //   endDate: '2022-08-31',
      // })
      res.status(200).json({
        success: true,
        message: 'campaign created successfully',
        ad,
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'internal server error',
        data: error.message,
      });
    }
  }
}

export default GoogleController;

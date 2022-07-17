import { GOOGLE_CLIENT_ID, GOOGLE_DEVELOPER_TOKEN } from '@/config';
import GoogleService from '@/services/google/google.service';
import { generateAccessToken, generateRandom } from '@/services/google/utils';
import { NextFunction, Request, Response } from 'express';
class GoogleController {
  public googleService: GoogleService = new GoogleService();
  private developerToken = GOOGLE_DEVELOPER_TOKEN;
  private customerId = '5921661095';
  private refreshToken = '1//0gncKtuGhzPxHCgYIARAAGBASNwF-L9IrtBeBmmW871Y-vuvb1gbYDrQ1NFEc7MQt8Bh35YqifjBc54ISPdcQZxAlN9OHFtIqhKI';
  public getCampaignList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let s = await this.googleService.getCampaign({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
      });

      res.status(200).json({
        success: true,
        message: 'campaign list fetched successfully',
        data: s,
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data[0].error.details[0].errors);

      next(error);
    }
  };

  public getAds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let s = await this.googleService.getAdGroupAds({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
      });

      res.status(200).json({
        success: true,
        message: 'ads fetched successfully',
        data: s,
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data[0].error.details[0].errors);

      next(error);
    }
  }
  public getAdGroups = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let s = await this.googleService.getAdGroup({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
      });

      res.status(200).json({
        success: true,
        message: 'ad group list fetched successfully',
        data: s,
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data[0].error.details[0].errors);
      next(error);
    }
  }

  public createAd = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const accessToken = await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let ad = await this.googleService.createSearchAd({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        resourceName: 'customers/5921661095/adGroups/146986282508',
        headlines: ['sample1','sample2','sample3'],
        descriptions: ['sample description','sample198'],
        websiteURL: 'https://www.markopolo.ai',
      });

      res.status(200).json({
        success: true,
        message: 'ad group created successfully',
        data: ad,
      });
    } catch (error) {
      console.log(error.message);
      console.log(error.response.data[0].error.details[0].errors);

      next(error);
    }
  }
  public createCampaign = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = await generateAccessToken({
        refreshToken: this.refreshToken,
      });
      let budget = await this.googleService.createBudget({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        amount: 5,
      });
      
      let campaign = await this.googleService.createCampaign({
        accessToken: accessToken,
        developerToken: this.developerToken,
        customerId: this.customerId,
        startDate: '2022-08-01',
        endDate: '2022-09-01',
        resourceName: budget.resourceName,
      });
      // let adGrp = await this.googleService.createAdGroup({
      //   accessToken: accessToken,
      //   developerToken: this.developerToken,
      //   customerId: this.customerId,
      //   resourceName: campaign.resourceName,
      //   name: `test-ad-group-${generateRandom()}`,
      // });

      
      // let ad = await this.googleService.createSearchAd({
      //   accessToken: accessToken,
      //   developerToken: this.developerToken,
      //   customerId: this.customerId,
      //   resourceName: 'customers/5921661095/adGroups/146986282508',
      //   headlines: ['sample1','sample2','sample3'],
      //   descriptions: ['sample description','sample198'],
      //   websiteURL: 'https://www.markopolo.ai',
      // });
      res.status(200).json({
        success: true,
        message: 'campaign created successfully',
        campaign,
      });
    } catch (error) {
      console.log(error.message);
      // console.log(error.response.data.error.details[0].fieldViolations);
      // console.log(error.response.data.error.details);
      console.log(error.response.data.error.details[0].errors[0].location);
      
      res.status(500).json({
        success: false,
        message: 'internal server error',
        data: error.message,
      });
    }
  };
}

export default GoogleController;

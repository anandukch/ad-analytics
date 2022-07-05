import App from '@/app';
// import "dotenv/config";
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CampaignRoute from './routes/campaign.route';
import GoogleRoute from './routes/google.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new CampaignRoute(), new GoogleRoute()]);

app.listen();

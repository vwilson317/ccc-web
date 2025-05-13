import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Footer } from './Footer';

export const Info = () => {
    const { t } = useTranslation();

    return (
        <div className="container mx-auto px-4 py-12 pb-24">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-green-600">
                    {t('common.info.aboutUs')}
                </h1>
                <div className="prose prose-lg">
                    <p className="text-gray-700">
                        {t('common.info.welcome')}
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">
                        {t('common.info.howItWorks')}
                    </h2>
                    <p className="text-gray-700">
                        {t('common.info.howItWorksText')}
                    </p>

                    <div className="mt-8 bg-green-50 p-4 rounded-lg">
                        <h3 className="text-xl font-semibold mb-2 text-green-600">
                            {t('common.info.getStarted')}
                        </h3>
                        <p className="text-gray-700">
                            <Link to="/register" className="text-green-600 hover:text-green-700 ml-1">
                                {t('common.signup')}
                            </Link>
                            {' '}{t('common.or')}{' '}
                            <Link to="/login" className="text-green-600 hover:text-green-700 ml-1">
                                {t('common.login')}
                            </Link>
                            {' '}{t('common.info.getStartedText')}
                        </p>
                        <ul className="list-disc pl-6 mt-2 text-gray-700">
                            <li>{t('common.info.featuresList.favorites')}</li>
                            <li>{t('common.info.featuresList.updates')}</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">
                        {t('common.info.features')}
                    </h2>
                    <ul className="list-disc pl-6 mt-2 text-gray-700">
                        <li>Real-time barraca availability status</li>
                        <li>Digital menu access</li>
                        <li>Accurate operating hours</li>
                        <li>Comprehensive barraca listings</li>
                        <li>User accounts with personalized features</li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">Coming Soon</h2>
                    <div className="bg-green-50 p-4 rounded-lg">
                        <ul className="list-disc pl-6 text-gray-700">
                            <li>Mobile app with push notifications for your favorite barracas</li>
                            <li>Customer reviews and ratings</li>
                            <li>Direct ordering system</li>
                            <li>Loyalty program with exclusive benefits</li>
                            <li>Personalized recommendations</li>
                        </ul>
                    </div>

                    <h2 className="text-2xl font-bold mt-8 mb-4 text-green-600">Contact</h2>
                    <p className="text-gray-700">
                        Have questions or suggestions? Reach out to us at:
                        <br />
                        Email: <a href="mailto:cariocacoastalclub@gmail.com" className="text-green-600 hover:text-green-700">cariocacoastalclub@gmail.com</a>
                    </p>

                </div>
            </div>

            <Footer 
                leftButton={{
                    to: "/",
                    label: "Back to Home",
                    icon: true
                }}
                rightButton={{
                    to: "/register",
                    label: "Get Started"
                }}
            />
        </div>
    );
};
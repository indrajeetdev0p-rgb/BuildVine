import { Metadata } from "next";
import { Telescope } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | BuildVine",
  description: "Privacy Policy for BuildVine",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary font-heading flex items-center gap-4 mb-4">
          <Telescope className="text-accent" size={36} />
          Privacy Policy
        </h1>
        <p className="text-text-secondary text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-accent hover:prose-a:text-accent-hover">
        <p>
          At BuildVine, accessible from buildvine.tech, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by BuildVine and how we use it.
        </p>

        <p>
          If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
        </p>

        <h2>General Data Protection Regulation (GDPR)</h2>
        <p>We are a Data Controller of your information.</p>
        <p>
          BuildVine legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
        </p>
        <ul>
          <li>BuildVine needs to perform a contract with you</li>
          <li>You have given BuildVine permission to do so</li>
          <li>Processing your personal information is in BuildVine legitimate interests</li>
          <li>BuildVine needs to comply with the law</li>
        </ul>

        <p>
          BuildVine will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
        </p>

        <h2>Information we collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>
        <p>
          When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
        </p>

        <h2>How we use your information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul>
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
          <li>Send you emails</li>
          <li>Find and prevent fraud</li>
        </ul>

        <h2>Log Files</h2>
        <p>
          BuildVine follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2>Cookies and Web Beacons</h2>
        <p>
          Like any other website, BuildVine uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2>Third Party Privacy Policies</h2>
        <p>
          BuildVine's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
        <p>
          You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.
        </p>
      </div>
    </div>
  );
}

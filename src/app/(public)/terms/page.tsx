import { Metadata } from "next";
import { Telescope } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | BuildVine",
  description: "Terms of Service for BuildVine",
};

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-text-primary font-heading flex items-center gap-4 mb-4">
          <Telescope className="text-accent" size={36} />
          Terms of Service
        </h1>
        <p className="text-text-secondary text-lg">
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>

      <div className="prose prose-invert max-w-none text-text-secondary prose-headings:text-text-primary prose-a:text-accent hover:prose-a:text-accent-hover">
        <p>
          Welcome to BuildVine!
        </p>
        <p>
          These terms and conditions outline the rules and regulations for the use of BuildVine's Website, located at buildvine.tech.
        </p>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use BuildVine if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2>Cookies</h2>
        <p>
          We employ the use of cookies. By accessing BuildVine, you agreed to use cookies in agreement with the BuildVine's Privacy Policy.
        </p>
        <p>
          Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
        </p>

        <h2>License</h2>
        <p>
          Unless otherwise stated, BuildVine and/or its licensors own the intellectual property rights for all material on BuildVine. All intellectual property rights are reserved. You may access this from BuildVine for your own personal use subjected to restrictions set in these terms and conditions.
        </p>
        <p>You must not:</p>
        <ul>
          <li>Republish material from BuildVine</li>
          <li>Sell, rent or sub-license material from BuildVine</li>
          <li>Reproduce, duplicate or copy material from BuildVine</li>
          <li>Redistribute content from BuildVine</li>
        </ul>

        <h2>User Content</h2>
        <p>
          Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. BuildVine does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of BuildVine, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, BuildVine shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.
        </p>
        <p>
          BuildVine reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.
        </p>

        <h2>Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
        </p>
        <ul>
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
        <p>
          As long as the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.
        </p>
      </div>
    </div>
  );
}

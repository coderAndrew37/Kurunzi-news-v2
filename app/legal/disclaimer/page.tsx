// app/legal/disclaimer/page.tsx
import Link from "next/link";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link
          href="/legal"
          className="text-blue-600 hover:underline mb-4 inline-block"
        >
          &larr; Back to Legal Information
        </Link>

        <h1 className="text-4xl font-bold text-neutral-900 mb-2">Disclaimer</h1>
        <p className="text-neutral-600 mb-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        <div className="prose prose-lg max-w-none">
          <p className="lead">
            The information provided by Kurunzi News on our website is for
            general informational purposes only. All information on the site is
            provided in good faith, however we make no representation or
            warranty of any kind, express or implied, regarding the accuracy,
            adequacy, validity, reliability, availability, or completeness of
            any information on the site.
          </p>

          <h2>1. Professional Disclaimer</h2>
          <p>
            The site cannot and does not contain professional advice. The
            information is provided for general informational and educational
            purposes only and is not a substitute for professional advice.
          </p>
          <p>
            Accordingly, before taking any actions based upon such information,
            we encourage you to consult with the appropriate professionals. We
            do not provide any kind of professional advice. The use or reliance
            of any information contained on this site is solely at your own
            risk.
          </p>

          <h2>2. External Links Disclaimer</h2>
          <p>
            The site may contain links to external websites that are not
            provided or maintained by or in any way affiliated with Kurunzi
            News. Please note that we do not guarantee the accuracy, relevance,
            timeliness, or completeness of any information on these external
            websites.
          </p>

          <h2>3. Errors and Omissions Disclaimer</h2>
          <p>
            While we have made every attempt to ensure that the information
            contained in this site has been obtained from reliable sources,
            Kurunzi News is not responsible for any errors or omissions or for
            the results obtained from the use of this information.
          </p>
          <p>
            All information in this site is provided &quot;as is&quot;, with no
            guarantee of completeness, accuracy, timeliness, or of the results
            obtained from the use of this information, and without warranty of
            any kind, express or implied.
          </p>

          <h2>4. Fair Use Disclaimer</h2>
          <p>
            The site may contain copyrighted material the use of which has not
            always been specifically authorized by the copyright owner. We are
            making such material available in our effort to advance
            understanding of political, human rights, economic, democracy,
            scientific, and social justice issues, etc.
          </p>
          <p>
            We believe this constitutes a &quot;fair use&quot; of any such
            copyrighted material as provided for in section 26 of the Kenyan
            Copyright Act. If you wish to use copyrighted material from the site
            for purposes of your own that go beyond fair use, you must obtain
            permission from the copyright owner.
          </p>

          <h2>5. Views Expressed Disclaimer</h2>
          <p>
            The site may contain views and opinions which are those of the
            authors and do not necessarily reflect the official policy or
            position of any other author, agency, organization, employer or
            company, including Kurunzi News.
          </p>
          <p>
            Comments published by users are their sole responsibility and the
            users will take full responsibility, liability and blame for any
            libel or litigation that results from something written in or as a
            direct result of something written in a comment.
          </p>

          <h2>6. No Responsibility Disclaimer</h2>
          <p>
            In no event shall Kurunzi News or its suppliers be liable for any
            special, incidental, indirect, or consequential damages whatsoever
            arising out of or in connection with your access or use or inability
            to access or use the website.
          </p>

          <h2>7. &quot;Use at Your Own Risk&quot; Disclaimer</h2>
          <p>
            All information in the website is provided &quot;as is&quot;, with
            no guarantee of completeness, accuracy, timeliness or of the results
            obtained from the use of this information, and without warranty of
            any kind, express or implied, including, but not limited to
            warranties of performance, merchantability and fitness for a
            particular purpose.
          </p>
          <p>
            Kurunzi News will not be liable to You or anyone else for any
            decision made or action taken in reliance on the information given
            by the Service or for any consequential, special or similar damages,
            even if advised of the possibility of such damages.
          </p>

          <h2>8. Contact Us</h2>
          <p>
            If you have any questions about this Disclaimer, you can contact us:
          </p>
          <address className="not-italic">
            Kurunzi News
            <br />
            Email: legal@kurunzinews.com
            <br />
            Phone: +254 700 123 456
            <br />
            Address: Nairobi, Kenya
          </address>
        </div>
      </div>
    </div>
  );
}

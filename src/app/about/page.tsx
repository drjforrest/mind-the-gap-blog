import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="prose prose-lg dark:prose-invert max-w-none space-y-6">
        <div className="flex flex-col items-center text-center mb-8">
          <Image
            src="/images/mind-the-gap-logo.png"
            alt="Mind the Gap Logo"
            width={120}
            height={120}
            className="mb-4"
          />
          <h1 className="text-4xl font-bold tracking-tighter mb-6">
            Mind the Gap: AI, Digital Health, and Who Gets Left Behind
          </h1>
        </div>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            General Description and Framing
          </h2>
          <p>
            Welcome to Mind the Gap! In this rapidly evolving digital age,
            Artificial Intelligence (AI) is transforming every facet of our
            lives, and healthcare is no exception. From predicting disease
            outbreaks to personalizing treatment plans, AI holds immense promise
            to revolutionize how we stay healthy and receive care. But as an
            academic deeply invested in the societal and public health impact of
            technology, I believe it's crucial to ask a critical question:{" "}
            <strong>
              Who benefits from this revolution, and who might be left behind?
            </strong>
          </p>
          <p>
            Drawing on decades of digital health history and implementation
            patterns, we'll explore how past innovations succeeded or failed at
            serving diverse communities - and what today's AI revolution can
            learn from those experiences. This blog is a space to explore the
            fascinating, often complex, and sometimes unsettling intersection of
            AI and digital health, always with a sharp focus on{" "}
            <strong>equity</strong>. We'll be discussing how these powerful
            technologies can either bridge or widen existing health gaps,
            examining the challenges of algorithmic bias, the digital divide,
            data privacy, and equitable access. More importantly, we'll
            spotlight innovative solutions, ethical frameworks, and policy
            considerations that can ensure AI truly serves <em>everyone</em>,
            not just a privileged few.
          </p>
          <p>
            Through historical analysis, contemporary case studies, and
            real-world examples, we'll unpack the science, discuss the ethics,
            and share stories that highlight the human impact of AI in
            healthcare. Whether you're a patient, a healthcare professional, a
            policymaker, a technologist, or simply someone curious about the
            future of health, this blog aims to equip you with the knowledge and
            perspective needed to engage critically with this vital
            conversation.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Why This Should Interest You
          </h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>
              <strong>Your Health is on the Line:</strong> AI is already
              influencing medical decisions, diagnoses, and access to care.
              Understanding how it works – and where its blind spots might be –
              is crucial for advocating for your own health and the health of
              your loved ones.
            </li>

            <li>
              <strong>It's About Fairness and Justice:</strong> We believe that
              healthcare is a right, not a privilege. While access to AI itself
              may not be a fundamental right, when we integrate AI into
              healthcare systems, we make equitable access to AI-enhanced care a
              matter of health justice. This is not a technical problem, it's a
              moral one.
            </li>

            <li>
              <strong>The Future is Being Built Now:</strong> The decisions made
              today about AI's role in healthcare will have profound
              implications for generations to come. By engaging with these
              topics, you can contribute to shaping a future where technology
              truly serves to uplift all communities.
            </li>

            <li>
              <strong>Beyond the Hype (and the Fear):</strong> There's a lot of
              buzz around AI, both positive and negative. This blog cuts through
              the noise to provide a balanced, evidence-informed perspective,
              helping you understand the real opportunities and risks.
            </li>

            <li>
              <strong>Empowerment Through Knowledge:</strong> Whether you want
              to understand why your doctor might use an AI tool, how digital
              health apps can impact different communities, or what policies are
              needed to protect vulnerable populations, this blog will provide
              clarity and empower you to be a more informed citizen and
              advocate.
            </li>
          </ol>
        </section>

        <section className="space-y-4 mt-12">
          <h2 className="text-2xl font-semibold">About the Author</h2>
          <p>
            Dr. Jamie Forrest is a Postdoctoral Fellow in the School of Nursing,
            Faculty of Applied Science at the University of British Columbia,
            where she investigates the transformative intersection of digital
            technology and global health research partnerships. With over
            fifteen years of experience bridging clinical and public health
            research operations and scholarship, Dr. Forrest brings a unique
            perspective to understanding how artificial intelligence and digital
            tools are reshaping equity, governance, and capacity distribution in
            North-South collaborations.
          </p>
          <p>
            As a former lead of the TOGETHER adaptive platform trial
            Consortium—which recruited more than 12,000 patients across 22
            global clinical sites—Dr. Forrest has hands-on experience designing
            and scaling multi-site research infrastructure that generates
            landmark evidence published in journals such as The Lancet Global
            Health and The New England Journal of Medicine. His career has been
            defined by building and co-leading cross-continental partnerships
            between Canadian and African institutions, working alongside
            academic centres, ministries of health, and international agencies
            to advance clinical and public health research.
          </p>
          <p>
            This extensive field experience revealed both the transformative
            potential and persistent challenges of international collaboration,
            motivating Dr. Forrest's current scholarly focus on systematically
            examine capacity and equity in North-South research partnerships
            themselves.
          </p>
          <p>
            Dr. Forrest is committed to ensuring that technological advances in
            global health research directly serve community priorities. Through
            Mind the Gap Digital Health Equity Blog, he shares insights on
            designing inclusive, sustainable collaborations that centre equity
            as the AI revolution unfolds and global health and its research
            partnerships research become increasingly more digitized.
          </p>
          <p>
            Jamie resides in Vancouver, British Columbia, Canada. You can reach
            him at{" "}
            <a
              href="mailto:james.forrest@ubc.ca"
              className="text-primary hover:underline"
            >
              james.forrest@ubc.ca
            </a>
          </p>
        </section>

        <p className="text-lg font-medium mt-8">
          Join me as we navigate this exciting and essential frontier, working
          towards a future where AI and digital health truly mean{" "}
          <strong>health for all</strong>.
        </p>
      </div>
    </div>
  );
}

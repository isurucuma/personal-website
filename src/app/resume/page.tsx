import { Button } from "@/components/ui/button";

export default function ResumePage() {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <div className="space-y-8">
        {/* Header section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Isuru Cumaranathunga</h1>
          <p className="text-xl text-muted-foreground">Software Engineer</p>
          <p className="text-lg text-muted-foreground">Colombo, Sri Lanka</p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" asChild>
              <a
                href="https://github.com/isurucuma"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://linkedin.com/in/isurucuma"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://medium.com/@isurucuma"
                target="_blank"
                rel="noopener noreferrer"
              >
                Medium
              </a>
            </Button>
          </div>
        </div>

        {/* Summary section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Summary</h2>
          <p className="text-muted-foreground">
            A software engineer with 2+ years of experience developing
            cloud-native applications in Kubernetes. Skilled at thriving in
            dynamic, challenging environments as part of Agile and Scrum teams.
            Passionate about sharing knowledge and fostering innovation. Author
            of an engaging Medium blog, where I share insights and lessons from
            my industry-level experiences in computer science and software
            engineering.
          </p>
        </section>

        {/* Experience section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Experience</h2>
          <div className="space-y-6">
            <div className="border-l-2 pl-4 space-y-2">
              <h3 className="text-xl font-semibold">Software Engineer</h3>
              <p className="text-muted-foreground">
                DMSL (Pickme) • September 2024 - Present
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Revamped the legacy PickMe Golang microservice platform to
                  support multi-tenancy, enhancing scalability and
                  maintainability
                </li>
                <li>
                  Engineered a token exchange mechanism to ensure seamless user
                  migration during the transition
                </li>
                <li>
                  Integrated and deployed APISIX API Gateway, developing custom
                  extensions in Golang and Lua
                </li>
                <li>
                  Redesigned the authentication service by integrating it with
                  Keycloak
                </li>
              </ul>
            </div>
            <div className="border-l-2 pl-4 space-y-2">
              <h3 className="text-xl font-semibold">Software Engineer</h3>
              <p className="text-muted-foreground">
                Axiata Digital Labs • August 2023 - September 2024
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Designed and developed a distributed API Gateway with Java and
                  C++
                </li>
                <li>
                  Enhanced security using Keycloak and OpenFGA based on Google's
                  Zanzibar model
                </li>
                <li>
                  Built mission-control service using Prometheus, Jaeger, and
                  Kubernetes API Server
                </li>
                <li>
                  Conducted client demonstrations to showcase product features
                </li>
              </ul>
            </div>
            <div className="border-l-2 pl-4 space-y-2">
              <h3 className="text-xl font-semibold">
                Software Engineer Intern
              </h3>
              <p className="text-muted-foreground">
                Axiata Digital Labs • February 2023 - August 2023
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>
                  Developed microservices using Java and C++ in a Linux
                  environment
                </li>
                <li>
                  Wrote integration tests with Python using Pytest and
                  Testcontainers
                </li>
                <li>
                  Implemented observability using OpenTelemetry and Prometheus
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Skills section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Skills</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Programming Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {["Java", "GoLang", "Python", "JavaScript"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Frameworks and Tools
              </h3>
              <div className="flex flex-wrap gap-2">
                {["SpringBoot", "Kafka", "Keycloak"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Databases & Storage
              </h3>
              <div className="flex flex-wrap gap-2">
                {["MySQL", "PostgreSQL", "MongoDB", "Redis"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">DevOps & Cloud</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "Docker",
                  "Kubernetes",
                  "GKE",
                  "Github Actions",
                  "Jenkins",
                  "Prometheus",
                  "Jaeger",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Education section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Education</h2>
          <div className="border-l-2 pl-4 space-y-2">
            <h3 className="text-xl font-semibold">
              B.Sc. (Hons.) in Engineering (Computer Engineering)
            </h3>
            <p className="text-muted-foreground">
              University of Jaffna • 2018 - 2023
            </p>
            <p className="text-muted-foreground">
              GPA: 3.40 / 4.00 (Second class upper division)
            </p>
          </div>
        </section>

        {/* Certifications section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Certifications</h2>
          <div className="space-y-4">
            <div className="border-l-2 pl-4">
              <h3 className="text-xl font-semibold">
                Google Cloud Core Infrastructure
              </h3>
              <p className="text-muted-foreground">Google Cloud • April 2024</p>
            </div>
            <div className="border-l-2 pl-4">
              <h3 className="text-xl font-semibold">
                AWS Cloud Technical Essentials
              </h3>
              <p className="text-muted-foreground">AWS • February 2024</p>
            </div>
            <div className="border-l-2 pl-4">
              <h3 className="text-xl font-semibold">
                Microsoft Certified Azure Fundamentals (AZ900)
              </h3>
              <p className="text-muted-foreground">
                Microsoft • September 2022
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

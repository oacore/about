import React from 'react'
import Link from 'next/link'
import { Article, Accordion } from 'components'
import { Features, Feature } from 'components/features'

const DashboardPage = () => (
  <Article container>
    <h1>CORE Repository Dashboard</h1>

    <figure>
      <img
        src="https://via.placeholder.com/600x400"
        alt="Some screenshot"
        className="d-block w-100 mx-auto"
      />
      <figcaption>Description of screenshot</figcaption>
    </figure>

    {/* Key messages */}

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi laborum
      illum animi quis iusto cumque id quam nulla incidunt tenetur eos est iure
      vero voluptas, vel alias esse sed odio.
    </p>
    <p>
      Sapiente, nesciunt dignissimos incidunt et, earum perspiciatis optio at
      voluptate, similique tempora vel magni atque excepturi eveniet. Asperiores
      quae quas sapiente numquam maxime quaerat sunt, recusandae dolorem ex
      culpa cumque.
    </p>

    <Accordion>
      <Accordion.Item id="fisrtItem" title="Hello">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Accordion.Item>
      <Accordion.Item id="secondItem" title="Hello">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Accordion.Item>
      <Accordion.Item id="thirdItem" title="Hello">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
        terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
        labore wes anderson cred nesciunt sapiente ea proident.
      </Accordion.Item>
    </Accordion>
    <Link href="/services/docs">Looking for documentation?</Link>

    <Features>
      <h2>Looking for more features?</h2>
      <p>Weʼve designed premium packages that enable great functionality</p>

      <Feature id="feature-for-institutions" forTitle="institutions">
        <h4>Premium feature for CORE member:</h4>
        <ul>
          <li>Additional feature 1</li>
          <li>Additional feature 2</li>
        </ul>
      </Feature>
      <Feature id="feature-for-data-analytics" forTitle="data and analytics">
        Feature for data and analytics
      </Feature>
      <Feature id="feature-for-funders" forTitle="funders">
        Feature for funders
      </Feature>
      <Feature id="feature-for-data-providers" forTitle="data providers">
        Feature for data providers
      </Feature>

      <p>
        Canʼt find a package that fits your needs?
        <a href="/contact">Get in touch bespoke extended access to CORE</a>
      </p>
    </Features>
  </Article>
)

export default DashboardPage

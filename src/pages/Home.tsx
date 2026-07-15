import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Building, Briefcase, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 md:py-32 bg-gradient-to-b from-primary/5 to-background text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 max-w-4xl text-foreground">
          Empowering Every Ability with <span className="text-primary">AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl">
          Helping people with disabilities build skills, discover opportunities, and connect with inclusive employers.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Button size="lg" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
            <Link to="/register">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
            <Link to="/jobs">Explore Jobs</Link>
          </Button>
          <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg h-14 px-8" asChild>
            <Link to="/employer">Employer Portal</Link>
          </Button>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: 'Active Users', value: '10,000+' },
            { label: 'Jobs Posted', value: '5,000+' },
            { label: 'Inclusive Employers', value: '500+' },
            { label: 'Success Stories', value: '2,500+' },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center p-4">
              <span className="text-4xl font-bold text-primary mb-2">{stat.value}</span>
              <span className="text-muted-foreground font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">How Saksham AI Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Sparkles,
              title: 'AI Assessment',
              desc: 'Discover your strengths and get personalized career recommendations through our inclusive assessment.'
            },
            {
              icon: GraduationCap,
              title: 'Skill Building',
              desc: 'Access curated courses and AI interview coaching to bridge the gap and prepare for your dream job.'
            },
            {
              icon: Building,
              title: 'Inclusive Matching',
              desc: 'Get matched with employers who provide the exact accessibility accommodations you need.'
            }
          ].map((feature, i) => (
            <Card key={i} className="border-none shadow-md bg-card/50 hover:bg-card transition-colors">
              <CardContent className="pt-8 text-center flex flex-col items-center">
                <div className="bg-primary/10 p-4 rounded-full mb-6">
                  <feature.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-8">Trusted by Inclusive Employers</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {['Infosys', 'Wipro', 'TCS', 'HCL', 'Tech Mahindra'].map((partner, i) => (
              <div key={i} className="text-2xl font-bold text-muted-foreground flex items-center gap-2">
                <Building className="h-6 w-6" />
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              quote: "The AI assessment perfectly understood my needs. I found a remote role that accommodates my visual impairment seamlessly.",
              author: "Aarav K.",
              role: "Frontend Developer"
            },
            {
              quote: "Saksham's interview coach built my confidence. The accessibility audit feature ensured my new workplace was ready for me.",
              author: "Priya S.",
              role: "Accessibility Tester"
            }
          ].map((testimonial, i) => (
            <Card key={i} className="bg-primary/5 border-primary/10">
              <CardContent className="pt-8">
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold">{testimonial.author}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

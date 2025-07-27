import { motion } from 'framer-motion';
import { Instagram, ArrowRight, Sparkles, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ProductCarousel from '@/components/ProductCarousel';
import { Link } from 'react-router-dom';
import { createInstagramProfileLink } from '@/config/social';

const Home = () => {
  const features = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'No Custom Duties',
      description: 'Shop worry-free! All customs duties and import fees are handled by us - no surprise charges at delivery.'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Get your Korean beauty products in just 7-10 days! No more waiting 25+ days for your skincare essentials.'
    },
    {
      icon: <Instagram className="w-8 h-8" />,
      title: 'Personal Beauty Consultant',
      description: 'Get personalized product recommendations through Instagram DM based on your skin type and beauty goals.'
    }
  ];

  return (
    <div className="min-h-screen bg-background relative">
      
      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          {/* Brand Introduction */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 glass-card px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Korean Beauty • Premium Cosmetics</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-4">
              <span className="text-primary">
                Peoni Beauty
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Premium Korean Cosmetics for Your Beauty Journey
              <br />
              <span className="text-lg opacity-80">Fast shipping • No customs fees • Personal consultation</span>
            </p>
          </motion.div>


          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Button 
              size="lg"
              className="bg-primary text-primary-foreground glow-effect text-lg px-8 py-6 smooth-transition hover:scale-105"
              onClick={() => window.open(createInstagramProfileLink(), '_blank')}
            >
              <Instagram className="w-5 h-5 mr-2" />
              Order Now
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="glass-card text-lg px-8 py-6 smooth-transition hover:scale-105"
              asChild
            >
              <Link to="/products">
                View Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-16 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Why Choose Peoni Beauty?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the difference with our premium service
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="glass-card p-8 text-center hover:glow-effect smooth-transition">
                  <div className="text-primary mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-playfair font-semibold mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Carousel */}
      <ProductCarousel />

      {/* Call to Action Section */}
      {/* Call to Action Section */}
<section className="relative z-10 py-16 px-4">
  <div className="container mx-auto text-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-card px-6 py-10 sm:px-12 sm:py-12 rounded-3xl max-w-3xl mx-auto"
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold mb-6">
        Let's Connect on Instagram!
      </h2>
      <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
        From personalized consultations to placing orders, everything happens through our Instagram DM.
        Get beauty advice, product recommendations, and a seamless ordering experience.
      </p>

      <div className="flex justify-center">
        <Button
          size="lg"
          className="bg-primary text-primary-foreground glow-effect text-base sm:text-lg px-6 sm:px-10 py-4 sm:py-5 rounded-full w-full sm:w-auto smooth-transition hover:scale-105"
          onClick={() => window.open(createInstagramProfileLink(), '_blank')}
        >
          <Instagram className="w-5 h-5 mr-2 sm:mr-3" />
          Message Us on Instagram
        </Button>
      </div>
    </motion.div>
  </div>
</section>
    </div>
  );
};

export default Home;

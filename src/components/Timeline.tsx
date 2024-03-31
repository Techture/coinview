import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

interface TimelineProps {
  events: string[];
}

const historyData = {
  Bitcoin: [
    {
      title: '2009-01-03',
      cardTitle: 'Bitcoin Network Launch',
      cardSubtitle: 'The Genesis Block is mined.',
      cardDetailedText:
        'Bitcoin was the first cryptocurrency to successfully record transactions on a secure, decentralized blockchain-based network.',
    },
    {
      title: '2010-05-22',
      cardTitle: 'Bitcoin Pizza Day',
      cardSubtitle: 'First commercial transaction.',
      cardDetailedText:
        'Laszlo Hanyecz famously spent 10,000 Bitcoins for two pizzas, marking what is now celebrated as Bitcoin Pizza Day.',
    },
    {
      title: '2012-11-28',
      cardTitle: 'First Halving',
      cardSubtitle: 'Bitcoin reward drops.',
      cardDetailedText:
        'The first Bitcoin halving occurred, reducing the reward for mining new blocks from 50 Bitcoins to 25 Bitcoins.',
    },
    {
      title: '2017-12-17',
      cardTitle: 'Bitcoin All-Time High',
      cardSubtitle: 'Peak of the bull run.',
      cardDetailedText:
        'Bitcoin reached an all-time high of almost $20,000, at the peak of the 2017 bull run, attracting widespread attention.',
    },
  ],
  Ethereum: [
    {
      title: '2015-07-30',
      cardTitle: 'Ethereum Launch',
      cardSubtitle: 'The Ethereum blockchain is released.',
      cardDetailedText:
        'Ethereum was launched, introducing the concept of "smart contracts" which execute automatically when certain conditions are met.',
    },
    {
      title: '2016-06-17',
      cardTitle: 'The DAO Hack',
      cardSubtitle: 'Decentralized Autonomous Organization attack.',
      cardDetailedText:
        'A vulnerability was exploited in the DAO project, leading to the theft of over $50 million worth of Ether and eventually to the hard fork that split Ethereum and Ethereum Classic.',
    },
    {
      title: '2017-12-07',
      cardTitle: 'CryptoKitties Craze',
      cardSubtitle: 'The viral Ethereum blockchain game.',
      cardDetailedText:
        'CryptoKitties became a blockchain sensation, congesting the network and highlighting the potential of Ethereum for decentralized applications.',
    },
    {
      title: '2020-12-01',
      cardTitle: 'Ethereum 2.0 Phase 0',
      cardSubtitle: 'The Beacon Chain is launched.',
      cardDetailedText:
        'Ethereum 2.0 began its phased rollout with the launch of the Beacon Chain, initiating the network’s transition from Proof of Work to Proof of Stake.',
    },
  ],
  Litecoin: [
    {
      title: '2011-10-13',
      cardTitle: 'Litecoin Network Goes Live',
      cardSubtitle: 'The launch of Litecoin.',
      cardDetailedText:
        'Litecoin was created to improve upon Bitcoin’s technology, offering faster transaction times and lower fees.',
    },
    {
      title: '2013-11-28',
      cardTitle: 'First Litecoin Halving',
      cardSubtitle: 'Mining reward halving.',
      cardDetailedText:
        'Litecoin experienced its first halving event, reducing the mining reward from 50 to 25 LTC.',
    },
    {
      title: '2017-05-10',
      cardTitle: 'Litecoin Activates SegWit',
      cardSubtitle: 'First to adopt SegWit.',
      cardDetailedText:
        'Litecoin was the first of the top 5 cryptocurrencies by market cap to adopt Segregated Witness (SegWit), improving its blockchain’s capacity.',
    },
    {
      title: '2019-08-05',
      cardTitle: 'Second Litecoin Halving',
      cardSubtitle: 'Another mining reward reduction.',
      cardDetailedText:
        'The second halving event for Litecoin took place, further reducing the mining reward from 25 to 12.5 LTC, which impacts its inflation rate and scarcity.',
    },
  ],
};

const Timeline: React.FC<TimelineProps> = ({ events }) => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Explicitly typing the toArray method's return value
    const sections: HTMLElement[] = gsap.utils.toArray('.timeline-event') as HTMLElement[];

    gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: wrapperRef.current as HTMLElement,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => `+=${wrapperRef.current?.offsetWidth}`,
      },
    });

    sections.forEach((section: HTMLElement, index: number) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'center center',
        onEnter: () => gsap.fromTo(section, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [events]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden">
      <div ref={timelineRef} className="timeline flex">
        {events.map((event, index) => (
          <div
            key={index}
            className="timeline-event flex-none w-1/2 flex justify-center items-center"
          >
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center m-4 shadow-lg">
              <div className="text-sm">{index + 1}</div>
            </div>
            <p className="opacity-0 text-center">{event}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;

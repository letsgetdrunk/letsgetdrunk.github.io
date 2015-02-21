$(function() {
	
	
	// GROUP QUESTS
	// All of these have an effect that's not related to the person whos turn it current is
	drinking.buildAndAddQuest('Keeper of the Crypt', "Oldest person has to drink.", []);
	drinking.buildAndAddQuest("Isn't It Past Your Bedtime?", "Youngest person drinks", []);
	drinking.buildAndAddQuest('Fresh Meat', "Person who most recently had sex has to drink. If a couple, they both have to drink - twice", []);
	drinking.buildAndAddQuest('Avoiding Beer Shits', "Person who last had a shit drinks", []);	
	drinking.buildAndAddQuest('#feminism', "All women drink. All offended people drink twice", []);
	drinking.buildAndAddQuest('Bros Before Hoes', "All men drink. All offended people drink twice", []);
	drinking.buildAndAddQuest('Beastial', "Group takes a vote on the hairiest person - they have to drink", []);
	drinking.buildAndAddQuest('Another Round!', "Everyone drinks", []);
	drinking.buildAndAddQuest('Another Round!', "Everyone drinks", []);
	drinking.buildAndAddQuest('Another Round!', "Everyone drinks", []);
	drinking.buildAndAddQuest('Another Round!', "Everyone drinks", []);
	drinking.buildAndAddQuest('Big Vs. Small', "The tallest and the smallest players must drink", []);
	drinking.buildAndAddQuest('I, AM, IRON, MAN', "Player with the most piercings must drink", []);
	drinking.buildAndAddQuest('Can You Even See The Screen?', "Everyone wearing glasses must drink. Everyone wearing contacts drinks twice, for hiding your shame.", []);
	drinking.buildAndAddQuest('Sophisticated', "Everyone who has their legs crossed by drink.", []);
	drinking.buildAndAddQuest('Brojob! Choo-choo!', "Each male must grab another male's crotch. The last male to have his crotch grabbed must drink.", []);
	drinking.buildAndAddQuest('Clam Slam!', "Each female must grab another female's boobs. The last female to have her boobs grabbed must drink.", []);
	drinking.buildAndAddQuest('Buddies!', "Everyone high five each other. Whoever doesn't get high-fived has to drink. If everyone get's high-fived, everyone drink!", []);
	drinking.buildAndAddQuest("Breaking the Seal", "Last player to go for a piss has to drink.", []);
	drinking.buildAndAddQuest("Coming of Age", "Player whos birthday is coming up next must drink.", []);
	drinking.buildAndAddQuest("Welcome Back", "Player who most recently went on holiday must drink.", []);
	drinking.buildAndAddQuest("For Your Rights", "Last player to stand up must drink.", []);
	drinking.buildAndAddQuest('Who Ya Gonna Call?', "Last person to shout 'Ghostbusters!' must drink.", []);	
	drinking.buildAndAddQuest('La Reh-Voh-Loo-See-Ohn!', "Last person to shout 'VIVA LA FRANCE!' in a French accent must drink.", []);
	drinking.buildAndAddQuest('Dungeon Master', "Anyone who lives in a house with a basement must drink.", []);
	drinking.buildAndAddQuest('The Dark Tower', "Anyone who lives in a house with an attic/loft must drink.", []);
	drinking.buildAndAddQuest('Noise Control', "Anyone who lives in a flat/apartment must drink.", []);
		
	// NOMINATIONS
	// All of these are based around the person whos turn it is nominating one or more other players to do something
	drinking.buildAndAddQuest('Alcohol, I Choose You!', "Nominate someone to drink", []);
	drinking.buildAndAddQuest('Alcohol, I Choose You!', "Nominate someone to drink", []);
	drinking.buildAndAddQuest('Alcohol, I Choose You!', "Nominate someone to drink", []);
	drinking.buildAndAddQuest('Alcohol, I Choose You!', "Nominate someone to drink", []);
	drinking.buildAndAddQuest('Damage Type: Area of Effect', "Nomiate a player - they must drink twice. The players to their left and right must drink once", []);
	drinking.buildAndAddQuest('Clash of the Titans', "Choose someone to arm wrestle with. Loser drinks", []);
	drinking.buildAndAddQuest('Clash of the Titans 2', "Choose someone to play rock-paper-scissors with. Loser drinks. If it's a tie, you both drink.", []);
	drinking.buildAndAddQuest('Clash of the Titans 3', "Choose someone to have a thumb-war with. Loser drinks.", []);
	drinking.buildAndAddQuest('Clash of the Titans 4', "Choose someone to have a staring contest with. Loser drinks.", []);
	drinking.buildAndAddQuest('Above The Limit', "Nomiate a player to balance on one foot, eyes closed, for 10 seconds. They fail, they drink. They make it, you drink - twice.", []);
	drinking.buildAndAddQuest('Nice One, Dude!', "Nomiate a player. Everytime they drink, they must bro-fist you. If/when they fail, they drink twice (and this effect stops)", []);
	
	// THINGS THAT EFFECT YOU OR PENALTIES OR ALLOW YOU TO DO STUFF
	// Thing that effect only the person whos turn it is, or things directly related to the person whos turn it is	
	// drinking.buildAndAddQuest('The Power of Rock', "Choose a letter, and say a band name starting with that letter. Everyone does this, starting clockwise from yourself. No repeats. First person to fail must drink.", []);
	drinking.buildAndAddQuest('Cock Rock', "Drink once for each male sitting next to you.", []);
	drinking.buildAndAddQuest('Hen Party', "Drink once for each female sitting next to you.", []);
	drinking.buildAndAddQuest('Backfire!', "Take a drink.", []);
	drinking.buildAndAddQuest('Nooooo!', "Take a drink.", []);
	drinking.buildAndAddQuest("I'm Here To Get Drunk, Anyway", "Take a drink.", []);
	drinking.buildAndAddQuest('Why Me?!', "Take a drink.", []);
	// drinking.buildAndAddQuest('Medusa\'s Glare', "Yell the word 'MEDUSA!' in the near future. Last person to cover their eyes must drink twice (one for each eye)", []);
	drinking.buildAndAddQuest("Dishing It Out", "The 2 players to your left and right must drink", []);
	drinking.buildAndAddQuest("Clusterfuck", "The 2 players to your left and right must drink", []);
	drinking.buildAndAddQuest("", "The 2 players to your left and right must drink", []);	
	
	// STATUS ADDERS
	drinking.buildAndAddQuest('Double Trouble', "Every drink that happens on one of your turns is doubled", ['Double Trouble']);
	drinking.buildAndAddQuest('Chaser', "For every drink that happens on one of your turns, add one more", ['Chaser']);
	drinking.buildAndAddQuest('Say My Name, Bitch', "Choose a nickname for yourself. Anyone who fails to call you by this name you can nominate to drink.", ['Say My Name, Bitch']);	
	
	
			
});
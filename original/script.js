var drinking = {	
	players : [], 		// stores the actual players
	played_last : [], 	// convinience storage for people who played last
	current_turn : 0,	// current game turn
	player_index : 0,	// index of the person whos turn it is
	quests : [],		// the tasks that players have to do
	Player : function() {
		this.name = 'test',
		this.status_effects = [],
		drinking.Player.prototype.addStatusEffect = function(status_effect) {
			if ($.inArray(status_effect, this.status_effects) > -1) {
				
			} else {
				this.status_effects.push(status_effect);
			}
		},
		drinking.Player.prototype.addStatusEffects = function(status_effects) {			
			for (var i = 0; i < status_effects.length; i++) {
				this.addStatusEffect(status_effects[i]);
			}
		},
		drinking.Player.prototype.getStatusEffects = function() {
			return this.status_effects;
		},
		drinking.Player.prototype.getStatusEffect = function(i) {
			return this.status_effects[i];
		},
		drinking.Player.prototype.setName = function(name) {
			this.name = name;
		},
		drinking.Player.prototype.getName = function() {
			return this.name;
		},
		drinking.Player.prototype.setStatusEffects = function(status_effects) {
			this.status_effects = status_effects;
		}
	},
	Quest : function() {
		this.name = '',
		this.text = '',
		this.status_effects = [],
		drinking.Quest.prototype.setName = function(name) {
			this.name = name;
		},
		drinking.Quest.prototype.getName = function(name) {
			return this.name;
		},
		drinking.Quest.prototype.setText = function(text) {
			this.text = text;
		},
		drinking.Quest.prototype.getText = function(text) {
			return this.text;
		},
		drinking.Quest.prototype.addStatusEffect = function(status_effect) {
			this.status_effects.push(status_effect);
		},
		drinking.Quest.prototype.getStatusEffects = function() {
			return this.status_effects;
		},
		drinking.Quest.prototype.getStatusEffect = function(i) {
			return this.status_effects[i];
		},
		drinking.Quest.prototype.setStatusEffects = function(status_effects) {
			this.status_effects = status_effects;
		}
	},
	addQuest : function(quest) {
		drinking.quests.push(quest);
	},
	buildAndAddQuest : function(name, text, status_effects) {
		quest = new drinking.Quest();
		
		quest.setName(name);
		quest.setText(text);
		quest.setStatusEffects(status_effects);
		
		drinking.quests.push(quest);
	},
	turnObjectIntoPlayer : function(object) {
		player = new drinking.Player();
		
		player.name = object.name;
		
		return player;
	},
	togglePlayerSelector : function(player_selector) {
		if (player_selector.hasClass('inactive')) {
			player_selector.removeClass('inactive');
			player_selector.addClass('active');
			player_selector.find('i').removeClass('fa-times-circle');
			player_selector.find('i').addClass('fa-check-circle');
		} else {
			player_selector.removeClass('active');
			player_selector.addClass('inactive');
			player_selector.find('i').removeClass('fa-check-circle');
			player_selector.find('i').addClass('fa-times-circle');
		}
	},
	updateCurrentPlayerHTML : function(player) {
		$('#current-player-name').html('');
		$('.status-effects-wrapper').html('');
		name = player.name;
		
		$('#current-player-name').html(name);
		
		for (var i = 0; i < player.getStatusEffects().length; i++) {
			
			var status = player.getStatusEffects()[i];
			
			var html = '<div class="status-effect">' + status + '</div>'
			
			$('.status-effects-wrapper').append(html);
		}
	},
	startGame : function() {
		
		// build array of names of people playing				
		// but could be the people who last played
		
		if ($('.player-selector-last-played').hasClass('active')) {			
			for (var i = 0; i < drinking.played_last.length; i++) {
				drinking.players.push(drinking.turnObjectIntoPlayer(drinking.played_last[i]));
			}			
		} else {
			$('.player-selector.active').each(function() {
				
				player = new drinking.Player();
				player.setName($(this).find('.name').html());
				
				drinking.players.push(player);
			});	
		}
		
		// save them to local storage
		localStorage['drinking.players'] = JSON.stringify(drinking.players);
		
		// swap the game areas around
		$('.add-players').hide();
		$('.game-area').show();
		
		// effectively start the game
		drinking.nextTurn();
		
	},
	initialiseStuff : function() {
		
		if (localStorage.getItem('drinking.players') === null) {
			$('.played-last').parents('li').hide();
		} else {
			drinking.played_last = JSON.parse(localStorage['drinking.players']);
			
			names = [];
			for (var i = 0; i < drinking.played_last.length;i++) {
				p = drinking.played_last[i];				
				names.push(p.name);
			}
			
			$('.played-last').html(names.join(', '));
		}
		
	},
	drawAndProcessQuest : function() {
		// get and display the quest
		var quest_id = Math.floor((Math.random() * drinking.quests.length));
		
		quest = drinking.quests[quest_id];
		
		$('#current-instructions').html(quest.text);
		$('#current-instruction-name').html(quest.name);
		
		if (quest.getStatusEffects().length > 0) {			
			if (Settings.sticky_status_effects == true) {
				player.addStatusEffects(quest.getStatusEffects());	
			} else {
				player.setStatusEffects(quest.getStatusEffects());
			}
		}
		
		drinking.updateCurrentPlayerHTML(player);
	},
	nextTurn : function() {
		var current_turn = drinking.current_turn;		
		var player_index = drinking.player_index;
		
		$('#turn-counter').data('turn-counter', current_turn + 1);
		$('#turn-counter').html(current_turn + 1);
		
		// display name of person whos turn it is		
		player = drinking.players[drinking.player_index];		
		drinking.updateCurrentPlayerHTML(player);
		
		drinking.drawAndProcessQuest();
		
		drinking.players[drinking.player_index] = player;
		
		// advance the counters for the next players turn
		drinking.current_turn++;
		drinking.player_index++;
		
		if (drinking.player_index == drinking.players.length) {
			drinking.player_index = 0;
		}
	}
};

// MAIN GAME LOOP
$(function() {

	drinking.initialiseStuff();

	// selecting whos playing
	$('.player-selector').on('click', function() { 

		playSound.play('toggle');
		
		drinking.togglePlayerSelector($(this));    	
	});

	// starting the game    
	$('#start-game-button').on('click', function() {   
		playSound.play('start_game');	
		
		drinking.startGame();    	
	});

	// hitting next turn
	$('#next-turn').on('click', function() {
		drinking.nextTurn();
		playSound.play('next_turn');
	});
	
	// or pressing enter or space to go to next turn
	$(document).keydown(function(e) {		
		if (e.which == 32 || e.which == 13) {
			e.preventDefault();
						
			drinking.nextTurn();
			playSound.play('next_turn');			
		}
	});
	
	/**
	 * SETTINGS STUFF
	 */

	// TODO make this not horrific
	$('#settings_sounds').on('click', function() {
		Settings.togglePlaySounds();
	});	
	$('#settings_sticky_status_effects').on('click', function() {
		Settings.toggleStickyStatusEffects();
	});

});

var Settings = {
	play_sounds : false,
	sticky_status_effects : true,
	togglePlaySounds : function() {
		if (Settings.play_sounds == true) {
			Settings.play_sounds = false;
			$('#settings_sounds').removeClass('btn-success');
			$('#settings_sounds').addClass('btn-danger');
			$('#settings_sounds').html('SOUNDS ARE OFF');
		} else {
			Settings.play_sounds = true;
			$('#settings_sounds').removeClass('btn-danger');
			$('#settings_sounds').addClass('btn-success');
			$('#settings_sounds').html('SOUNDS ARE ON');
		}
	},
	toggleStickyStatusEffects : function() {
		if (Settings.sticky_status_effects == true) {
			Settings.sticky_status_effects = false;
			$('#settings_sticky_status_effects').removeClass('btn-success');
			$('#settings_sticky_status_effects').addClass('btn-danger');
			$('#settings_sticky_status_effects').html('STICKY STATUS EFFECTS ARE OFF');
		} else {
			Settings.sticky_status_effects = true;
			$('#settings_sticky_status_effects').removeClass('btn-danger');
			$('#settings_sticky_status_effects').addClass('btn-success');
			$('#settings_sticky_status_effects').html('STICKY STATUS EFFECTS ARE ON');
		}
	}
	
};

var playSound = {	
	play: function(sound_file) {
		
		if (Settings.play_sounds == true) {
			var mySound = new buzz.sound( "sounds/" + sound_file, {
				formats: ["wav" ]
			});
			mySound.play();		
		}
	}	
};

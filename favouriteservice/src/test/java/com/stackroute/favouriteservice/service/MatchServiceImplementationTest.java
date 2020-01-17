package com.stackroute.favouriteservice.service;

import static org.junit.Assert.*;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.stackroute.favouriteservice.model.Match;
import com.stackroute.favouriteservice.exception.MatchAlreadyExistsException;
import com.stackroute.favouriteservice.exception.MatchNotFoundException;
import com.stackroute.favouriteservice.repository.MatchRepository;
import com.stackroute.favouriteservice.service.MatchServiceImplementation;

public class MatchServiceImplementationTest {

	@Mock
	private transient MatchRepository matchRepo;

	/**
	 * mocking match Object
	 */
	private transient Match match;

	/**
	 * Injecting mocks in MatchServiceImpl object
	 */
	@InjectMocks
	private transient MatchServiceImplementation matchServiceImpl;

	/**
	 * variable to hold user defined matches list
	 */
	transient Optional<Match> options;

	/**
	 * Initializing the object declarations
	 */
	@Before
	public void setupMock() {
		MockitoAnnotations.initMocks(this);
		match = new Match(1, "2341", "Pubg-bluehole", "normal", "erangel", "2015-03-23", "John123");
		options = Optional.of(match);
	}

	/**
	 * testing mock creation
	 */
	@Test
	public void testMockCreation() {
		assertNotNull("jpaRepository creation fails: use @InjectionMocks on matchServiceImpl", match);
	}

	/**
	 * testing the save method
	 * 
	 * @throws MatchAlreadyExistsException
	 */
	@Test
	public void testSaveMatchSuccess() throws MatchAlreadyExistsException {
		when(matchRepo.save(match)).thenReturn(match);
		final boolean flag = matchServiceImpl.saveMatch(match);
		assertTrue("saving match failed,the call to matchDAOImpl is returning false,check this method", flag);
		verify(matchRepo, times(1)).save(match);
	}

	@Test(expected = MatchAlreadyExistsException.class)
	public void testSaveMatchFailure() throws MatchAlreadyExistsException {
		when(matchRepo.findById(1)).thenReturn(options);
		when(matchRepo.save(match)).thenReturn(match);
		final boolean flag = matchServiceImpl.saveMatch(match);
		assertFalse("Saving match failed", flag);
		verify(matchRepo, times(1)).findById(match.getmId());

	}

	/**
	 * testing delete method
	 * 
	 * @throws MatchNotFoundException
	 */
	@Test
	public void testDeleteMatchById() throws MatchNotFoundException {
		when(matchRepo.findById(1)).thenReturn(options);
		doNothing().when(matchRepo).delete(match);
		final boolean flag = matchServiceImpl.deleteMovieById(1);
		assertTrue("deleting movie failed", flag);
		verify(matchRepo, times(1)).delete(match);
		verify(matchRepo, times(1)).findById(match.getmId());
	}

	@Test
	public void getmatchById() throws MatchNotFoundException {
		when(matchRepo.findById(1)).thenReturn(options);
		final Match match1 = matchServiceImpl.getMatchById(1);
		assertEquals("Getting match by This id failed", match1, match1);
		verify(matchRepo, times(1)).findById(match.getmId());

	}

	@Test(expected = MatchNotFoundException.class)
	public void testDeleteMatchByIdFailure() throws MatchNotFoundException {
		when(matchRepo.findById(-1)).thenReturn(null);
		doNothing().when(matchRepo).delete(match);
		final boolean flag = matchServiceImpl.deleteMovieById(1);
		assertTrue("deleting movie failed", flag);
		verify(matchRepo, times(1)).delete(match);
		verify(matchRepo, times(1)).findById(match.getmId());
	}

	/**
	 * testing getAll method
	 */
	@Test
	public void testGetAllMatches() {
		final List<Match> matchList = new ArrayList<>();
		matchList.add(match);
		when(matchRepo.findByUserId("manishji")).thenReturn(matchList);
		final List<Match> matches1 = matchServiceImpl.getAllMatches("manishji");
		assertEquals(matchList, matches1);
		verify(matchRepo, times(1)).findByUserId("manishji");
	}

}
